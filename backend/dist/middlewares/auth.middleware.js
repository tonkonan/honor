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
exports.authorize = exports.authenticate = void 0;
const auth_1 = require("../utils/auth");
// Middleware для проверки JWT токена
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Получаем токен из заголовка
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Не авторизован' });
        }
        // Извлекаем токен
        const token = authHeader.split(' ')[1];
        // Верифицируем токен
        const payload = (0, auth_1.verifyToken)(token);
        if (!payload) {
            return res.status(401).json({ error: 'Невалидный токен' });
        }
        // ВРЕМЕННАЯ ЗАГЛУШКА - пропускаем проверку пользователя в базе данных
        /*
        // Проверяем, существует ли пользователь
        const user = await prisma.user.findUnique({
          where: { id: payload.userId }
        });
        
        if (!user) {
          return res.status(401).json({ error: 'Пользователь не найден' });
        }
        */
        // Добавляем userId в объект запроса для использования в контроллерах
        req.userId = payload.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Не авторизован' });
    }
});
exports.authenticate = authenticate;
// Middleware для проверки роли пользователя
const authorize = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.userId) {
                return res.status(401).json({ error: 'Не авторизован' });
            }
            // ВРЕМЕННАЯ ЗАГЛУШКА - пропускаем проверку пользователя в базе данных
            // и считаем, что у всех пользователей роль ADMIN для тестирования
            /*
            // Получаем пользователя из базы данных
            const user = await prisma.user.findUnique({
              where: { id: req.userId }
            });
            
            if (!user) {
              return res.status(401).json({ error: 'Пользователь не найден' });
            }
            
            // Проверяем, имеет ли пользователь необходимую роль
            if (!roles.includes(user.role as UserRole)) {
              return res.status(403).json({ error: 'Доступ запрещен' });
            }
            */
            // Для тестирования просто разрешаем доступ
            next();
        }
        catch (error) {
            return res.status(401).json({ error: 'Не авторизован' });
        }
    });
};
exports.authorize = authorize;
