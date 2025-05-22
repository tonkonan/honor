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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
// Инициализируем сервис
const authService = new auth_service_1.AuthService();
// Контроллер для работы с аутентификацией
class AuthController {
    // Регистрация пользователя
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, fullName, role } = req.body;
                // Валидация входных данных
                if (!email || !password || !fullName) {
                    return res.status(400).json({ error: 'Необходимо указать email, пароль и имя' });
                }
                // Регистрируем пользователя
                const result = yield authService.register({ email, password, fullName, role });
                return res.status(201).json(result);
            }
            catch (error) {
                return res.status(400).json({ error: error.message || 'Ошибка при регистрации' });
            }
        });
    }
    // Вход пользователя
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Валидация входных данных
                if (!email || !password) {
                    return res.status(400).json({ error: 'Необходимо указать email и пароль' });
                }
                // Выполняем вход
                const result = yield authService.login({ email, password });
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(401).json({ error: error.message || 'Ошибка авторизации' });
            }
        });
    }
    // Получение информации о текущем пользователе
    getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // userId должен быть добавлен в req из middleware
                const userId = req.userId;
                if (!userId) {
                    return res.status(401).json({ error: 'Не авторизован' });
                }
                const user = yield authService.getCurrentUser(userId);
                return res.status(200).json({ user });
            }
            catch (error) {
                return res.status(400).json({ error: error.message || 'Ошибка при получении пользователя' });
            }
        });
    }
    // Запрос на восстановление пароля
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                // Валидация входных данных
                if (!email) {
                    return res.status(400).json({ error: 'Необходимо указать email' });
                }
                const result = yield authService.forgotPassword({ email });
                return res.status(200).json(result);
            }
            catch (error) {
                // Для безопасности не сообщаем о конкретной ошибке
                return res.status(200).json({
                    message: 'Если пользователь с таким email существует, инструкции по сбросу пароля будут отправлены'
                });
            }
        });
    }
    // Сброс пароля
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, newPassword } = req.body;
                // Валидация входных данных
                if (!token || !newPassword) {
                    return res.status(400).json({ error: 'Необходимо указать токен и новый пароль' });
                }
                const result = yield authService.resetPassword({ token, newPassword });
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json({ error: error.message || 'Ошибка при сбросе пароля' });
            }
        });
    }
}
exports.AuthController = AuthController;
