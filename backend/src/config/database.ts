import { PrismaClient } from '@prisma/client';

// Инициализируем Prisma Client для работы с базой данных
const prisma = new PrismaClient({
  // Отключаем логирование запросов в продакшене
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Эта функция будет вызываться при старте приложения
export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Успешное подключение к базе данных');
    return prisma;
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    process.exit(1);
  }
};

// Эта функция будет вызываться при остановке приложения
export const disconnectFromDatabase = async () => {
  await prisma.$disconnect();
  console.log('Отключение от базы данных');
};

export default prisma; 