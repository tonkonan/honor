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
const database_1 = require("./config/database");
// Загружаем переменные окружения
dotenv_1.default.config();
// Проверяем настройки подключения к базе данных
console.log('DATABASE_URL из переменных окружения:', process.env.DATABASE_URL || 'Не определен');
// Создаем экземпляр приложения
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Добавляем middleware для логирования запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Заголовки:', JSON.stringify(req.headers, null, 2));
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Тело запроса:', JSON.stringify(req.body, null, 2));
    }
    next();
});
// Подключаем маршруты API
app.use('/api', routes_1.default);
// Простой тестовый маршрут
app.get('/', (req, res) => {
    res.json({ message: 'API работает! Проект "Честь" запущен.' });
});
// Маршрут для проверки подключения к базе данных
app.get('/api/db-check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, database_1.testConnection)();
        res.json({
            success: result,
            message: result ? 'Подключение к базе данных работает' : 'Ошибка подключения к базе данных'
        });
    }
    catch (error) {
        console.error('Ошибка при проверке подключения к базе данных:', error);
        res.status(500).json({ success: false, error: 'Ошибка при проверке подключения к базе данных' });
    }
}));
// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('Ошибка сервера:', err);
    console.error('Стек вызовов:', err.stack);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});
// Обработчик запросов к несуществующим маршрутам
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});
// Запуск сервера
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Подключаемся к базе данных
        yield (0, database_1.connectToDatabase)();
        // Проверяем подключение к базе
        console.log('Проверка подключения к базе данных после инициализации сервера...');
        const testResult = yield (0, database_1.testConnection)();
        console.log('Результат проверки:', testResult ? 'Успешно' : 'Ошибка');
        // Запускаем сервер
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
            console.log(`API доступно по адресу: http://localhost:${PORT}/api`);
        });
        // Обработка сигналов завершения для корректного закрытия соединений
        process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, database_1.disconnectFromDatabase)();
            process.exit(0);
        }));
        process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, database_1.disconnectFromDatabase)();
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
