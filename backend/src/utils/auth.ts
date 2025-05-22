import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, SafeUser } from '../types/user';

// Количество раундов для хеширования пароля
const SALT_ROUNDS = 10;

// Хеширование пароля
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

// Проверка пароля
export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// Создание JWT токена
export const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

  // @ts-ignore - Игнорируем проблему с типами
  return jwt.sign({ userId }, secretKey, { expiresIn });
};

// Верификация JWT токена
export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
    return jwt.verify(token, secretKey) as { userId: string };
  } catch (error) {
    return null;
  }
};

// Удаление пароля из объекта пользователя для безопасной передачи клиенту
export const excludePassword = (user: User): SafeUser => {
  const { password, ...safeUser } = user;
  return safeUser;
}; 