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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludePassword = exports.verifyToken = exports.generateToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Количество раундов для хеширования пароля
const SALT_ROUNDS = 10;
// Хеширование пароля
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(SALT_ROUNDS);
    return bcryptjs_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
// Проверка пароля
const comparePasswords = (plainPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.compare(plainPassword, hashedPassword);
});
exports.comparePasswords = comparePasswords;
// Создание JWT токена
const generateToken = (userId) => {
    const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    // @ts-ignore - Игнорируем проблему с типами
    return jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn });
};
exports.generateToken = generateToken;
// Верификация JWT токена
const verifyToken = (token) => {
    try {
        const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
// Удаление пароля из объекта пользователя для безопасной передачи клиенту
const excludePassword = (user) => {
    const { password } = user, safeUser = __rest(user, ["password"]);
    return safeUser;
};
exports.excludePassword = excludePassword;
