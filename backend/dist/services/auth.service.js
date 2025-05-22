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
exports.AuthService = void 0;
// import prisma from '../config/database';
const user_1 = require("../types/user");
const auth_1 = require("../utils/auth");
// Сервис для работы с аутентификацией
class AuthService {
    // Регистрация пользователя
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // ВРЕМЕННАЯ ЗАГЛУШКА - имитация работы без реальной базы данных
            console.log('Регистрация пользователя:', userData);
            // Создаем тестового пользователя
            const newUser = {
                id: 'test-id-123',
                email: userData.email,
                password: 'хешированный-пароль',
                fullName: userData.fullName,
                role: userData.role || user_1.UserRole.CITIZEN,
                avatarUrl: null,
                isVerified: false,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            // Генерируем JWT токен
            const token = (0, auth_1.generateToken)(newUser.id);
            // Возвращаем безопасного пользователя и токен
            return {
                user: (0, auth_1.excludePassword)(newUser),
                token
            };
        });
    }
    // Вход пользователя
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            // ВРЕМЕННАЯ ЗАГЛУШКА - имитация работы без реальной базы данных
            console.log('Вход пользователя:', credentials);
            // Для тестирования считаем, что пользователь с таким email существует
            // и пароль верный
            const user = {
                id: 'test-id-123',
                email: credentials.email,
                password: 'хешированный-пароль',
                fullName: 'Тестовый Пользователь',
                role: user_1.UserRole.CITIZEN,
                avatarUrl: null,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            // Генерируем JWT токен
            const token = (0, auth_1.generateToken)(user.id);
            // Возвращаем безопасного пользователя и токен
            return {
                user: (0, auth_1.excludePassword)(user),
                token
            };
        });
    }
    // Получение информации о текущем пользователе
    getCurrentUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // ВРЕМЕННАЯ ЗАГЛУШКА - имитация работы без реальной базы данных
            console.log('Получение пользователя:', userId);
            // Возвращаем тестового пользователя
            const user = {
                id: userId,
                email: 'test@example.com',
                password: 'хешированный-пароль',
                fullName: 'Тестовый Пользователь',
                role: user_1.UserRole.CITIZEN,
                avatarUrl: null,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            return (0, auth_1.excludePassword)(user);
        });
    }
    // Запрос на восстановление пароля
    forgotPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // ВРЕМЕННАЯ ЗАГЛУШКА - имитация работы без реальной базы данных
            console.log('Запрос на восстановление пароля:', data);
            return { message: 'Если пользователь с таким email существует, инструкции по сбросу пароля будут отправлены' };
        });
    }
    // Сброс пароля
    resetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // ВРЕМЕННАЯ ЗАГЛУШКА - имитация работы без реальной базы данных
            console.log('Сброс пароля:', data);
            return { message: 'Пароль успешно сброшен' };
        });
    }
}
exports.AuthService = AuthService;
