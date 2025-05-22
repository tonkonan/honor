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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = __importDefault(require("../config/database"));
const auth_1 = require("../utils/auth");
const uuid_1 = require("uuid");
// Сервис для работы с аутентификацией
class AuthService {
    // Регистрация пользователя
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('=== НАЧАЛО AUTH_SERVICE.REGISTER ===');
            console.log('Входные данные:', JSON.stringify(userData, null, 2));
            try {
                // Вывод дополнительного отладочного сообщения
                console.log('ВНИМАНИЕ! НАЧАЛО РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ!');
                // Прямой SQL запрос для проверки подключения
                try {
                    const testQuery = yield database_1.default.$queryRaw `SELECT NOW() as time, current_database() as db`;
                    console.log('Тестовый запрос к базе данных успешен:', testQuery);
                }
                catch (sqlError) {
                    console.error('ОШИБКА ТЕСТОВОГО SQL ЗАПРОСА:', sqlError);
                }
                // Проверяем, существует ли пользователь с таким email
                console.log('Поиск существующего пользователя по email:', userData.email);
                const existingUser = yield database_1.default.user.findUnique({
                    where: { email: userData.email }
                });
                console.log('Результат поиска пользователя:', existingUser);
                if (existingUser) {
                    console.log('Пользователь с таким email уже существует');
                    throw new Error('Пользователь с таким email уже существует');
                }
                // Хешируем пароль
                console.log('Хеширование пароля...');
                const hashedPassword = yield (0, auth_1.hashPassword)(userData.password);
                console.log('Пароль успешно хеширован');
                // Создаем ID пользователя
                const userId = (0, uuid_1.v4)();
                console.log('Сгенерирован ID пользователя:', userId);
                try {
                    // Создаем пользователя через Prisma ORM
                    console.log('Создание пользователя через Prisma ORM...');
                    const newUser = yield database_1.default.user.create({
                        data: {
                            id: (0, uuid_1.v4)(),
                            email: userData.email,
                            password: hashedPassword,
                            fullName: userData.fullName,
                            phone: userData.phone || null,
                            district: userData.district || null,
                            address: userData.address || null,
                            role: userData.role || 'CITIZEN'
                        }
                    });
                    console.log('Результат создания пользователя:', newUser);
                    // Проверяем, что пользователь создан
                    const verifyUser = yield database_1.default.user.findUnique({
                        where: { id: userId }
                    });
                    console.log('Проверка создания пользователя SQL запросом:', verifyUser);
                    if (!verifyUser) {
                        console.error('КРИТИЧЕСКАЯ ОШИБКА: Пользователь не был создан!');
                        throw new Error('Ошибка создания пользователя: запись не найдена после вставки');
                    }
                    // Генерируем JWT токен
                    console.log('Генерация JWT токена');
                    const token = (0, auth_1.generateToken)(newUser.id);
                    console.log('Токен успешно сгенерирован');
                    // Адаптируем к нашему типу User и исключаем пароль
                    const adaptedUser = Object.assign(Object.assign({}, newUser), { role: newUser.role, phone: newUser.phone, district: newUser.district, address: newUser.address });
                    const safeUser = (0, auth_1.excludePassword)(adaptedUser);
                    console.log('=== КОНЕЦ AUTH_SERVICE.REGISTER - УСПЕХ ===');
                    return {
                        user: safeUser,
                        token
                    };
                }
                catch (createError) {
                    console.error('КРИТИЧЕСКАЯ ОШИБКА ПРИ СОЗДАНИИ ПОЛЬЗОВАТЕЛЯ:');
                    console.error('Сообщение об ошибке:', createError.message);
                    console.error('Стек вызовов:', createError.stack);
                    if (createError.code) {
                        console.error('Код ошибки:', createError.code);
                    }
                    throw new Error(`Ошибка создания пользователя: ${createError.message}`);
                }
            }
            catch (error) {
                console.error('=== КОНЕЦ AUTH_SERVICE.REGISTER - ОШИБКА ===');
                console.error('Ошибка:', error.message);
                console.error('Стек вызовов:', error.stack);
                throw error;
            }
        });
    }
    // Вход пользователя
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('=== НАЧАЛО AUTH_SERVICE.LOGIN ===');
            console.log('Входные данные:', JSON.stringify({ email: credentials.email }, null, 2));
            try {
                // Ищем пользователя по email
                console.log('Поиск пользователя по email:', credentials.email);
                const user = yield database_1.default.user.findUnique({
                    where: { email: credentials.email }
                });
                console.log('Результат поиска пользователя:', user ? 'Пользователь найден' : 'Пользователь не найден');
                // Если пользователь не найден
                if (!user) {
                    console.log('Пользователь не найден');
                    throw new Error('Неверный email или пароль');
                }
                // Проверяем пароль
                console.log('Проверка пароля...');
                const isPasswordValid = yield (0, auth_1.comparePasswords)(credentials.password, user.password);
                console.log('Результат проверки пароля:', isPasswordValid ? 'Пароль верный' : 'Пароль неверный');
                if (!isPasswordValid) {
                    console.log('Пароль неверный');
                    throw new Error('Неверный email или пароль');
                }
                // Генерируем JWT токен
                console.log('Генерация JWT токена');
                const token = (0, auth_1.generateToken)(user.id);
                console.log('Токен успешно сгенерирован');
                // Адаптируем к нашему типу User и исключаем пароль
                const adaptedUser = Object.assign(Object.assign({}, user), { role: user.role });
                const safeUser = (0, auth_1.excludePassword)(adaptedUser);
                console.log('=== КОНЕЦ AUTH_SERVICE.LOGIN - УСПЕХ ===');
                return {
                    user: safeUser,
                    token
                };
            }
            catch (error) {
                console.error('=== КОНЕЦ AUTH_SERVICE.LOGIN - ОШИБКА ===');
                console.error('Ошибка:', error.message);
                console.error('Стек вызовов:', error.stack);
                throw error;
            }
        });
    }
    // Получение информации о текущем пользователе
    getCurrentUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('=== НАЧАЛО AUTH_SERVICE.GET_CURRENT_USER ===');
            console.log('ID пользователя:', userId);
            try {
                // Ищем пользователя по ID
                console.log('Поиск пользователя по ID:', userId);
                const user = yield database_1.default.user.findUnique({
                    where: { id: userId }
                });
                console.log('Результат поиска пользователя:', user ? 'Пользователь найден' : 'Пользователь не найден');
                if (!user) {
                    console.log('Пользователь не найден');
                    throw new Error('Пользователь не найден');
                }
                // Адаптируем к нашему типу User и исключаем пароль
                const adaptedUser = Object.assign(Object.assign({}, user), { role: user.role });
                const safeUser = (0, auth_1.excludePassword)(adaptedUser);
                console.log('=== КОНЕЦ AUTH_SERVICE.GET_CURRENT_USER - УСПЕХ ===');
                return safeUser;
            }
            catch (error) {
                console.error('=== КОНЕЦ AUTH_SERVICE.GET_CURRENT_USER - ОШИБКА ===');
                console.error('Ошибка:', error.message);
                console.error('Стек вызовов:', error.stack);
                throw error;
            }
        });
    }
    // Запрос на восстановление пароля
    forgotPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('=== НАЧАЛО AUTH_SERVICE.FORGOT_PASSWORD ===');
            console.log('Email для восстановления:', data.email);
            try {
                // Ищем пользователя по email
                console.log('Поиск пользователя по email:', data.email);
                const user = yield database_1.default.user.findUnique({
                    where: { email: data.email }
                });
                console.log('Результат поиска пользователя:', user ? 'Пользователь найден' : 'Пользователь не найден');
                // По соображениям безопасности всегда возвращаем один и тот же ответ
                console.log('=== КОНЕЦ AUTH_SERVICE.FORGOT_PASSWORD - УСПЕХ ===');
                return { message: 'Если пользователь с таким email существует, инструкции по сбросу пароля будут отправлены' };
            }
            catch (error) {
                console.error('=== КОНЕЦ AUTH_SERVICE.FORGOT_PASSWORD - ОШИБКА ===');
                console.error('Ошибка:', error.message);
                console.error('Стек вызовов:', error.stack);
                throw error;
            }
        });
    }
    // Сброс пароля
    resetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('=== НАЧАЛО AUTH_SERVICE.RESET_PASSWORD ===');
            console.log('Токен для сброса пароля:', data.token ? 'Присутствует' : 'Отсутствует');
            try {
                // Здесь должна быть проверка токена и нахождение пользователя
                // Для примера используем заглушку
                console.log('Хеширование нового пароля...');
                const hashedPassword = yield (0, auth_1.hashPassword)(data.newPassword);
                console.log('Пароль успешно хеширован');
                console.log('=== КОНЕЦ AUTH_SERVICE.RESET_PASSWORD - УСПЕХ ===');
                return { message: 'Пароль успешно сброшен' };
            }
            catch (error) {
                console.error('=== КОНЕЦ AUTH_SERVICE.RESET_PASSWORD - ОШИБКА ===');
                console.error('Ошибка:', error.message);
                console.error('Стек вызовов:', error.stack);
                throw error;
            }
        });
    }
}
exports.AuthService = AuthService;
