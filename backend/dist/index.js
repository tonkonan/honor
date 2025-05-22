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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
// import { connectToDatabase, disconnectFromDatabase } from './config/database';
// Загружаем переменные окружения
dotenv_1.default.config();
// Создаем экземпляр приложения
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Подключаем маршруты API
app.use('/api', routes_1.default);
// Простой тестовый маршрут
app.get('/', (req, res) => {
    res.json({ message: 'API работает! Проект "Честь" запущен.' });
});
// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});
// Обработчик запросов к несуществующим маршрутам
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});
// Запуск сервера
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Временно отключаем подключение к базе данных для тестирования API
        // await connectToDatabase();
        // Запускаем сервер
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
        // Обработка сигналов завершения для корректного закрытия соединений
        process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
            // await disconnectFromDatabase();
            process.exit(0);
        }));
        process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
            // await disconnectFromDatabase();
            process.exit(0);
        }));
    }
    catch (error) {
        console.error('Ошибка при запуске сервера:', error);
        process.exit(1);
    }
});
// Запускаем сервер
startServer();
