import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
// import prisma from '../config/database';
import { UserRole } from '../types/user';

// Интерфейс для расширения Request с полем userId
interface AuthRequest extends Request {
  userId?: string;
}

// Middleware для проверки JWT токена
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Получаем токен из заголовка
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Не авторизован' });
    }
    
    // Извлекаем токен
    const token = authHeader.split(' ')[1];
    
    // Верифицируем токен
    const payload = verifyToken(token);
    
    if (!payload) {
      return res.status(401).json({ error: 'Невалидный токен' });
    }
    
    // ВРЕМЕННАЯ ЗАГЛУШКА - пропускаем проверку пользователя в базе данных
    /*
    // Проверяем, существует ли пользователь
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }
    */
    
    // Добавляем userId в объект запроса для использования в контроллерах
    req.userId = payload.userId;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Не авторизован' });
  }
};

// Middleware для проверки роли пользователя
export const authorize = (roles: UserRole[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Не авторизован' });
      }
      
      // ВРЕМЕННАЯ ЗАГЛУШКА - пропускаем проверку пользователя в базе данных
      // и считаем, что у всех пользователей роль ADMIN для тестирования
      /*
      // Получаем пользователя из базы данных
      const user = await prisma.user.findUnique({
        where: { id: req.userId }
      });
      
      if (!user) {
        return res.status(401).json({ error: 'Пользователь не найден' });
      }
      
      // Проверяем, имеет ли пользователь необходимую роль
      if (!roles.includes(user.role as UserRole)) {
        return res.status(403).json({ error: 'Доступ запрещен' });
      }
      */
      
      // Для тестирования просто разрешаем доступ
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Не авторизован' });
    }
  };
}; 