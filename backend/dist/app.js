"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const api_middleware_1 = require("./middlewares/api.middleware");
// Создаем экземпляр приложения Express
const app = (0, express_1.default)();
// Устанавливаем заголовки безопасности с помощью Helmet
app.use((0, helmet_1.default)());
// Включаем CORS
app.use((0, cors_1.default)());
// Используем Morgan для логирования запросов в консоль
app.use((0, morgan_1.default)('dev'));
// Парсер для JSON
app.use(express_1.default.json());
// Парсер для URL-encoded форм
app.use(express_1.default.urlencoded({ extended: true }));
// Добавляем middleware для логирования API запросов
app.use('/api', api_middleware_1.apiLoggerMiddleware);
// Устанавливаем маршруты API
app.use('/api', routes_1.default);
// Устанавливаем корневой маршрут
app.get('/', (req, res) => {
    res.json({ message: 'API сервера Honor доступно по адресу /api' });
});
// Обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Путь не найден' });
});
exports.default = app;
