"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = exports.createUserWithDirectConnection = exports.createUserWithRawSQL = exports.checkPgDriver = exports.checkTables = exports.testConnection = void 0;
const prisma_1 = require("../../generated/prisma");
// Выводим подробную информацию о Prisma клиенте
console.log('Создание PrismaClient с расширенным логированием...');
// Создаем экземпляр Prisma клиента с включенным логированием
const prisma = new prisma_1.PrismaClient({
    log: [
        { level: 'query', emit: 'event' },
        { level: 'info', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
        { level: 'error', emit: 'stdout' },
    ],
});
// Настройка логирования запросов Prisma
prisma.$on('query', (e) => {
    console.log('=== PRISMA QUERY ===');
    console.log('Запрос:', e.query);
    console.log('Параметры:', e.params);
    console.log('Длительность:', `${e.duration}ms`);
    console.log('===================');
});
// Тестовая функция для проверки подключения к базе данных
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Выполнить простой запрос для проверки подключения
        console.log('Тестируем подключение к базе данных...');
        const result = yield prisma.$queryRaw `SELECT 1 as result`;
        console.log('Тест подключения к базе данных успешен!', result);
        return true;
    }
    catch (error) {
        console.error('Ошибка при тестировании подключения к базе данных:', error);
        return false;
    }
});
exports.testConnection = testConnection;
// Функция для проверки наличия таблиц
const checkTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Проверка таблиц в базе данных...');
        const tables = yield prisma.$queryRaw `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
        console.log('Найденные таблицы:', tables);
        // Проверка структуры таблицы User
        console.log('Проверка структуры таблицы User...');
        const userColumns = yield prisma.$queryRaw `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'User'
    `;
        console.log('Структура таблицы User:', userColumns);
        return true;
    }
    catch (error) {
        console.error('Ошибка при проверке таблиц:', error);
        return false;
    }
});
exports.checkTables = checkTables;
// Функция для проверки драйвера PostgreSQL
const checkPgDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Проверка драйвера PostgreSQL...');
        const driverInfo = yield prisma.$queryRaw `SELECT version()`;
        console.log('Информация о PostgreSQL:', driverInfo);
        return true;
    }
    catch (error) {
        console.error('Ошибка при проверке драйвера PostgreSQL:', error);
        return false;
    }
});
exports.checkPgDriver = checkPgDriver;
// Функция для выполнения прямого SQL-запроса для создания пользователя в транзакции
const createUserWithRawSQL = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Начинаем транзакцию для создания пользователя...');
    // Создаем соединение напрямую для выполнения транзакции
    const pgClient = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('Создание пользователя через прямой SQL в транзакции...');
            // 1. Проверяем, существует ли пользователь с таким email
            console.log('Проверка существования пользователя перед созданием...');
            const existingUsers = yield tx.$queryRaw `
        SELECT email FROM "User" WHERE email = ${userData.email}
      `;
            if (Array.isArray(existingUsers) && existingUsers.length > 0) {
                throw new Error(`Пользователь с email ${userData.email} уже существует`);
            }
            // 2. Создаем пользователя
            console.log('Выполнение INSERT запроса...');
            yield tx.$executeRaw `
        INSERT INTO "User" (
          id, email, password, "fullName", role, "isVerified", "createdAt", "updatedAt"
        ) VALUES (
          ${userData.id}, ${userData.email}, ${userData.password}, ${userData.fullName}, 
          ${userData.role}, ${userData.isVerified}, ${userData.createdAt}, ${userData.updatedAt}
        )
      `;
            // 3. Проверяем, что пользователь создан
            console.log('Проверка создания пользователя в транзакции...');
            const createdUser = yield tx.$queryRaw `
        SELECT * FROM "User" WHERE id = ${userData.id}
      `;
            console.log('Результат проверки создания пользователя:', createdUser);
            if (!Array.isArray(createdUser) || createdUser.length === 0) {
                throw new Error('Пользователь не был создан в базе данных');
            }
            console.log('Пользователь успешно создан в транзакции');
            return createdUser[0];
        }
        catch (error) {
            console.error('Ошибка в транзакции:', error);
            throw error;
        }
    }));
    console.log('Транзакция завершена, результат:', pgClient);
    return pgClient;
});
exports.createUserWithRawSQL = createUserWithRawSQL;
// Функция для создания пользователя через обычное соединение
const createUserWithDirectConnection = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Создание пользователя через прямое соединение...');
        // Выполняем PostgreSQL-команду BEGIN для начала транзакции
        yield prisma.$executeRaw `BEGIN`;
        // Выполняем вставку
        yield prisma.$executeRaw `
      INSERT INTO "User" (
        id, email, password, "fullName", role, "isVerified", "createdAt", "updatedAt"
      ) VALUES (
        ${userData.id}, ${userData.email}, ${userData.password}, ${userData.fullName}, 
        ${userData.role}, ${userData.isVerified}, ${userData.createdAt}, ${userData.updatedAt}
      )
    `;
        // Получаем созданного пользователя
        const result = yield prisma.$queryRaw `
      SELECT * FROM "User" WHERE id = ${userData.id}
    `;
        // Выполняем COMMIT для фиксации транзакции
        yield prisma.$executeRaw `COMMIT`;
        console.log('Транзакция завершена успешно, пользователь создан');
        return result;
    }
    catch (error) {
        // В случае ошибки выполняем откат транзакции
        console.error('Ошибка при создании пользователя, выполняем ROLLBACK', error);
        yield prisma.$executeRaw `ROLLBACK`;
        throw error;
    }
});
exports.createUserWithDirectConnection = createUserWithDirectConnection;
// Функция для подключения к базе данных
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Попытка подключения к базе данных...');
        yield prisma.$connect();
        console.log('Успешное подключение к базе данных');
        // Проверяем подключение
        const testResult = yield (0, exports.testConnection)();
        if (!testResult) {
            console.error('Хотя $connect успешен, тестовый запрос не выполнен. Проверьте настройки базы данных.');
        }
        // Проверяем таблицы
        yield (0, exports.checkTables)();
        // Проверяем драйвер PostgreSQL
        yield (0, exports.checkPgDriver)();
        return prisma;
    }
    catch (error) {
        console.error('Ошибка при подключении к базе данных:', error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
// Функция для отключения от базы данных
const disconnectFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$disconnect();
        console.log('Соединение с базой данных закрыто');
    }
    catch (error) {
        console.error('Ошибка при отключении от базы данных:', error);
    }
});
exports.disconnectFromDatabase = disconnectFromDatabase;
// Экспортируем клиент для использования в других частях приложения
exports.default = prisma;
