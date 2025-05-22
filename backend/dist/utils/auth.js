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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadFromToken = exports.excludePassword = exports.verifyToken = exports.generateToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Получение секретного ключа из переменных окружения
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
// Хеширование пароля
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
// Сравнение паролей
const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hashedPassword);
});
exports.comparePasswords = comparePasswords;
// Генерация JWT токена
const generateToken = (userId) => {
    // @ts-ignore - Обходим проблему с типами, которая возникает из-за несоответствия типов
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
exports.generateToken = generateToken;
// Проверка JWT токена
const verifyToken = (token) => {
    try {
        // @ts-ignore - Обходим проблему с типами
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error('Недействительный токен');
    }
};
exports.verifyToken = verifyToken;
// Исключение пароля из объекта пользователя
const excludePassword = (user) => {
    // Создаем копию объекта пользователя
    const userWithoutPassword = Object.assign({}, user);
    // Удаляем пароль из копии
    delete userWithoutPassword.password;
    // Возвращаем копию без пароля
    return userWithoutPassword;
};
exports.excludePassword = excludePassword;
// Получение payload из токена
const getPayloadFromToken = (token) => {
    try {
        // Удаляем Bearer из токена, если он есть
        const cleanToken = token.startsWith('Bearer ')
            ? token.slice(7)
            : token;
        // Декодируем токен
        // @ts-ignore - Обходим проблему с типами
        const decoded = jsonwebtoken_1.default.verify(cleanToken, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        throw new Error('Недействительный токен');
    }
};
exports.getPayloadFromToken = getPayloadFromToken;
