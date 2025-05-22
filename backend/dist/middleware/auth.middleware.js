"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware для проверки аутентификации
const authenticate = (req, res, next) => {
    console.log('=== НАЧАЛО MIDDLEWARE АУТЕНТИФИКАЦИИ ===');
    console.log('Запрос от клиента:', req.method, req.url);
    console.log('Заголовки запроса:', JSON.stringify(req.headers, null, 2));
    try {
        // Получаем токен из заголовка Authorization
        const authHeader = req.headers.authorization;
        console.log('Authorization header:', authHeader || 'Отсутствует');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('Токен отсутствует или имеет неверный формат');
            return res.status(401).json({ error: 'Не авторизован' });
        }
        // Извлекаем токен (удаляем 'Bearer ' из строки)
        const token = authHeader.substring(7);
        console.log('Получен токен длиной:', token.length);
        // Проверяем наличие JWT_SECRET
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('КРИТИЧЕСКАЯ ОШИБКА: JWT_SECRET не определен в переменных окружения');
            return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
        }
        // Верифицируем токен
        console.log('Верификация токена...');
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log('Токен верифицирован. ID пользователя:', decoded.userId);
        // Добавляем информацию о пользователе в запрос
        req.userId = decoded.userId;
        console.log('=== КОНЕЦ MIDDLEWARE АУТЕНТИФИКАЦИИ - УСПЕХ ===');
        next();
    }
    catch (error) {
        console.error('=== КОНЕЦ MIDDLEWARE АУТЕНТИФИКАЦИИ - ОШИБКА ===');
        console.error('Ошибка верификации токена:', error.message);
        console.error('Стек вызовов:', error.stack);
        // Отправляем ответ об ошибке
        return res.status(401).json({ error: 'Не авторизован' });
    }
};
exports.authenticate = authenticate;
