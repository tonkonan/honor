import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

// Инициализируем контроллер
const authController = new AuthController();

// Создаем роутер
const router = Router();

// Маршруты для аутентификации
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/forgot-password', authController.forgotPassword.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));
router.get('/me', authenticate, authController.getCurrentUser.bind(authController));

export default router; 