import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../types/user';

// Получение секретного ключа из переменных окружения
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Хеширование пароля
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Сравнение паролей
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Генерация JWT токена
export const generateToken = (userId: string): string => {
  // @ts-ignore - Обходим проблему с типами, которая возникает из-за несоответствия типов
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Проверка JWT токена
export const verifyToken = (token: string): any => {
  try {
    // @ts-ignore - Обходим проблему с типами
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Недействительный токен');
  }
};

// Исключение пароля из объекта пользователя
export const excludePassword = (user: User) => {
  // Создаем копию объекта пользователя
  const userWithoutPassword = { ...user };
  // Удаляем пароль из копии
  delete (userWithoutPassword as any).password;
  // Возвращаем копию без пароля
  return userWithoutPassword;
};

// Получение payload из токена
export const getPayloadFromToken = (token: string): any => {
  try {
    // Удаляем Bearer из токена, если он есть
    const cleanToken = token.startsWith('Bearer ') 
      ? token.slice(7) 
      : token;
    
    // Декодируем токен
    // @ts-ignore - Обходим проблему с типами
    const decoded = jwt.verify(cleanToken, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Недействительный токен');
  }
}; 