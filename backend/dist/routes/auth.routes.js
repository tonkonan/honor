"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
// Создаем экземпляр контроллера
const authController = new auth_controller_1.AuthController();
// Создаем маршруты для аутентификации
const router = express_1.default.Router();
// Регистрация пользователя
router.post('/register', authController.register.bind(authController));
// Вход пользователя
router.post('/login', authController.login.bind(authController));
// Получение информации о текущем пользователе
// Используем типизацию из Request для совместимости
router.get('/me', auth_middleware_1.authenticate, (req, res) => authController.getCurrentUser(req, res));
// Запрос на восстановление пароля
router.post('/forgot-password', authController.forgotPassword.bind(authController));
// Сброс пароля
router.post('/reset-password', authController.resetPassword.bind(authController));
exports.default = router;
