"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// Инициализируем контроллер
const authController = new auth_controller_1.AuthController();
// Создаем роутер
const router = (0, express_1.Router)();
// Маршруты для аутентификации
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/forgot-password', authController.forgotPassword.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));
router.get('/me', auth_middleware_1.authenticate, authController.getCurrentUser.bind(authController));
exports.default = router;
