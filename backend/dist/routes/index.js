"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
// Создаем главный роутер
const router = (0, express_1.Router)();
// Добавляем базовый маршрут для проверки API
router.get('/', (req, res) => {
    res.json({ message: 'API платформы "Честь" работает!' });
});
// Подключаем маршруты для разных модулей
router.use('/auth', auth_routes_1.default);
// Здесь в будущем будут подключаться другие маршруты:
// router.use('/users', userRoutes);
// router.use('/districts', districtRoutes);
// router.use('/tasks', taskRoutes);
// и т.д.
exports.default = router;
