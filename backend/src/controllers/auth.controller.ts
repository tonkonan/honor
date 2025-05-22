import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

// Инициализируем сервис
const authService = new AuthService();

// Контроллер для работы с аутентификацией
export class AuthController {
  // Регистрация пользователя
  async register(req: Request, res: Response) {
    try {
      const { email, password, fullName, role } = req.body;
      
      // Валидация входных данных
      if (!email || !password || !fullName) {
        return res.status(400).json({ error: 'Необходимо указать email, пароль и имя' });
      }
      
      // Регистрируем пользователя
      const result = await authService.register({ email, password, fullName, role });
      
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Ошибка при регистрации' });
    }
  }

  // Вход пользователя
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      // Валидация входных данных
      if (!email || !password) {
        return res.status(400).json({ error: 'Необходимо указать email и пароль' });
      }
      
      // Выполняем вход
      const result = await authService.login({ email, password });
      
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message || 'Ошибка авторизации' });
    }
  }

  // Получение информации о текущем пользователе
  async getCurrentUser(req: Request, res: Response) {
    try {
      // userId должен быть добавлен в req из middleware
      const userId = (req as any).userId;
      
      if (!userId) {
        return res.status(401).json({ error: 'Не авторизован' });
      }

      const user = await authService.getCurrentUser(userId);
      
      return res.status(200).json({ user });
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Ошибка при получении пользователя' });
    }
  }

  // Запрос на восстановление пароля
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      
      // Валидация входных данных
      if (!email) {
        return res.status(400).json({ error: 'Необходимо указать email' });
      }
      
      const result = await authService.forgotPassword({ email });
      
      return res.status(200).json(result);
    } catch (error: any) {
      // Для безопасности не сообщаем о конкретной ошибке
      return res.status(200).json({ 
        message: 'Если пользователь с таким email существует, инструкции по сбросу пароля будут отправлены' 
      });
    }
  }

  // Сброс пароля
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      
      // Валидация входных данных
      if (!token || !newPassword) {
        return res.status(400).json({ error: 'Необходимо указать токен и новый пароль' });
      }
      
      const result = await authService.resetPassword({ token, newPassword });
      
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Ошибка при сбросе пароля' });
    }
  }
} 