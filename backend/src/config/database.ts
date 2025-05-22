import { PrismaClient } from '../../generated/prisma';

// Выводим подробную информацию о Prisma клиенте
console.log('Создание PrismaClient с расширенным логированием...');

// Создаем экземпляр Prisma клиента с включенным логированием
const prisma = new PrismaClient({
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
export const testConnection = async () => {
  try {
    // Выполнить простой запрос для проверки подключения
    console.log('Тестируем подключение к базе данных...');
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('Тест подключения к базе данных успешен!', result);
    return true;
  } catch (error) {
    console.error('Ошибка при тестировании подключения к базе данных:', error);
    return false;
  }
};

// Функция для проверки наличия таблиц
export const checkTables = async () => {
  try {
    console.log('Проверка таблиц в базе данных...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Найденные таблицы:', tables);
    
    // Проверка структуры таблицы User
    console.log('Проверка структуры таблицы User...');
    const userColumns = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'User'
    `;
    console.log('Структура таблицы User:', userColumns);
    
    return true;
  } catch (error) {
    console.error('Ошибка при проверке таблиц:', error);
    return false;
  }
};

// Функция для проверки драйвера PostgreSQL
export const checkPgDriver = async () => {
  try {
    console.log('Проверка драйвера PostgreSQL...');
    const driverInfo = await prisma.$queryRaw`SELECT version()`;
    console.log('Информация о PostgreSQL:', driverInfo);
    return true;
  } catch (error) {
    console.error('Ошибка при проверке драйвера PostgreSQL:', error);
    return false;
  }
};

// Функция для выполнения прямого SQL-запроса для создания пользователя в транзакции
export const createUserWithRawSQL = async (userData: any) => {
  console.log('Начинаем транзакцию для создания пользователя...');
  
  // Создаем соединение напрямую для выполнения транзакции
  const pgClient = await prisma.$transaction(async (tx) => {
    try {
      console.log('Создание пользователя через прямой SQL в транзакции...');
      
      // 1. Проверяем, существует ли пользователь с таким email
      console.log('Проверка существования пользователя перед созданием...');
      const existingUsers = await tx.$queryRaw`
        SELECT email FROM "User" WHERE email = ${userData.email}
      `;
      
      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        throw new Error(`Пользователь с email ${userData.email} уже существует`);
      }
      
      // 2. Создаем пользователя
      console.log('Выполнение INSERT запроса...');
      await tx.$executeRaw`
        INSERT INTO "User" (
          id, email, password, "fullName", role, "isVerified", "createdAt", "updatedAt"
        ) VALUES (
          ${userData.id}, ${userData.email}, ${userData.password}, ${userData.fullName}, 
          ${userData.role}, ${userData.isVerified}, ${userData.createdAt}, ${userData.updatedAt}
        )
      `;
      
      // 3. Проверяем, что пользователь создан
      console.log('Проверка создания пользователя в транзакции...');
      const createdUser = await tx.$queryRaw`
        SELECT * FROM "User" WHERE id = ${userData.id}
      `;
      
      console.log('Результат проверки создания пользователя:', createdUser);
      
      if (!Array.isArray(createdUser) || createdUser.length === 0) {
        throw new Error('Пользователь не был создан в базе данных');
      }
      
      console.log('Пользователь успешно создан в транзакции');
      return createdUser[0];
    } catch (error) {
      console.error('Ошибка в транзакции:', error);
      throw error;
    }
  });
  
  console.log('Транзакция завершена, результат:', pgClient);
  return pgClient;
};

// Функция для создания пользователя через обычное соединение
export const createUserWithDirectConnection = async (userData: any) => {
  try {
    console.log('Создание пользователя через прямое соединение...');
    
    // Выполняем PostgreSQL-команду BEGIN для начала транзакции
    await prisma.$executeRaw`BEGIN`;
    
    // Выполняем вставку
    await prisma.$executeRaw`
      INSERT INTO "User" (
        id, email, password, "fullName", role, "isVerified", "createdAt", "updatedAt"
      ) VALUES (
        ${userData.id}, ${userData.email}, ${userData.password}, ${userData.fullName}, 
        ${userData.role}, ${userData.isVerified}, ${userData.createdAt}, ${userData.updatedAt}
      )
    `;
    
    // Получаем созданного пользователя
    const result = await prisma.$queryRaw`
      SELECT * FROM "User" WHERE id = ${userData.id}
    `;
    
    // Выполняем COMMIT для фиксации транзакции
    await prisma.$executeRaw`COMMIT`;
    
    console.log('Транзакция завершена успешно, пользователь создан');
    return result;
  } catch (error) {
    // В случае ошибки выполняем откат транзакции
    console.error('Ошибка при создании пользователя, выполняем ROLLBACK', error);
    await prisma.$executeRaw`ROLLBACK`;
    throw error;
  }
};

// Функция для подключения к базе данных
export const connectToDatabase = async () => {
  try {
    console.log('Попытка подключения к базе данных...');
    await prisma.$connect();
    console.log('Успешное подключение к базе данных');
    
    // Проверяем подключение
    const testResult = await testConnection();
    if (!testResult) {
      console.error('Хотя $connect успешен, тестовый запрос не выполнен. Проверьте настройки базы данных.');
    }
    
    // Проверяем таблицы
    await checkTables();
    
    // Проверяем драйвер PostgreSQL
    await checkPgDriver();
    
    return prisma;
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
    throw error;
  }
};

// Функция для отключения от базы данных
export const disconnectFromDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('Соединение с базой данных закрыто');
  } catch (error) {
    console.error('Ошибка при отключении от базы данных:', error);
  }
};

// Экспортируем клиент для использования в других частях приложения
export default prisma; 