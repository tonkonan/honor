import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

// Создаем экземпляр контроллера
const authController = new AuthController();

// Создаем маршруты для аутентификации
const router = express.Router();

// Регистрация пользователя
router.post('/register', authController.register.bind(authController));

// Вход пользователя
router.post('/login', authController.login.bind(authController));

// Получение информации о текущем пользователе
// Используем типизацию из Request для совместимости
router.get('/me', authenticate, (req, res) => authController.getCurrentUser(req as any, res));

// Запрос на восстановление пароля
router.post('/forgot-password', authController.forgotPassword.bind(authController));

// Сброс пароля
router.post('/reset-password', authController.resetPassword.bind(authController));

export default router; 