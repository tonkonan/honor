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
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
const client_1 = require("@prisma/client");
// Инициализируем Prisma Client для работы с базой данных
const prisma = new client_1.PrismaClient({
    // Отключаем логирование запросов в продакшене
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});
// Эта функция будет вызываться при старте приложения
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log('Успешное подключение к базе данных');
        return prisma;
    }
    catch (error) {
        console.error('Ошибка подключения к базе данных:', error);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
// Эта функция будет вызываться при остановке приложения
const disconnectFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    console.log('Отключение от базы данных');
});
exports.disconnectFromDatabase = disconnectFromDatabase;
exports.default = prisma;
