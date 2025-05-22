import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../types/request';

// Инициализируем сервис
const authService = new AuthService();

// Контроллер для работы с аутентификацией
export class AuthController {
  // Регистрация пользователя
  async register(req: Request, res: Response) {
    console.log('=== НАЧАЛО КОНТРОЛЛЕРА: РЕГИСТРАЦИЯ ===');
    try {
      const { email, password, fullName, role } = req.body;
      
      console.log('Данные для регистрации:', { email, fullName, role });
      
      // Валидация входных данных
      if (!email || !password || !fullName) {
        console.log('Ошибка валидации: отсутствуют обязательные поля');
        return res.status(400).json({ error: 'Необходимо указать email, пароль и имя' });
      }
      
      try {
        // Регистрируем пользователя
        console.log('Перед вызовом authService.register');
        const result = await authService.register({ email, password, fullName, role });
        console.log('После вызова authService.register. Результат получен успешно');
        
        console.log('Пользователь успешно зарегистрирован с ID:', result.user.id);
        console.log('=== КОНЕЦ КОНТРОЛЛЕРА: РЕГИСТРАЦИЯ - УСПЕХ ===');
        
        return res.status(201).json(result);
      } catch (serviceError: any) {
        console.error('Ошибка в сервисе регистрации:', serviceError.message);
        throw serviceError;
      }
    } catch (error: any) {
      console.error('=== КОНЕЦ КОНТРОЛЛЕРА: РЕГИСТРАЦИЯ - ОШИБКА ===');
      console.error('Общая ошибка при регистрации:', error.message);
      console.error('Стек вызовов:', error.stack);
      return res.status(400).json({ error: error.message || 'Ошибка при регистрации' });
    }
  }

  // Вход пользователя
  async login(req: Request, res: Response) {
    console.log('=== НАЧАЛО КОНТРОЛЛЕРА: ВХОД ===');
    try {
      const { email, password } = req.body;
      
      console.log('Попытка входа для email:', email);
      
      // Валидация входных данных
      if (!email || !password) {
        console.log('Ошибка валидации: отсутствуют обязательные поля');
        return res.status(400).json({ error: 'Необходимо указать email и пароль' });
      }
      
      // Аутентифицируем пользователя
      console.log('Перед вызовом authService.login');
      const result = await authService.login({ email, password });
      console.log('После вызова authService.login. Результат получен успешно');
      
      console.log('Успешный вход для пользователя с ID:', result.user.id);
      console.log('=== КОНЕЦ КОНТРОЛЛЕРА: ВХОД - УСПЕХ ===');
      
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('=== КОНЕЦ КОНТРОЛЛЕРА: ВХОД - ОШИБКА ===');
      console.error('Ошибка при входе:', error.message);
      console.error('Стек вызовов:', error.stack);
      return res.status(401).json({ error: error.message || 'Неверный email или пароль' });
    }
  }

  // Получение информации о текущем пользователе
  async getCurrentUser(req: AuthRequest, res: Response) {
    console.log('=== НАЧАЛО КОНТРОЛЛЕРА: ПОЛУЧЕНИЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ ===');
    try {
      const userId = req.userId;
      console.log('ID текущего пользователя из запроса:', userId);
      
      if (!userId) {
        console.log('Ошибка: отсутствует ID пользователя в запросе');
        return res.status(401).json({ error: 'Не авторизован' });
      }
      
      // Получаем информацию о пользователе
      console.log('Перед вызовом authService.getCurrentUser');
      const user = await authService.getCurrentUser(userId);
      console.log('После вызова authService.getCurrentUser. Информация получена успешно');
      
      console.log('Возвращаем данные пользователя с ID:', user.id);
      console.log('=== КОНЕЦ КОНТРОЛЛЕРА: ПОЛУЧЕНИЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ - УСПЕХ ===');
      
      return res.status(200).json(user);
    } catch (error: any) {
      console.error('=== КОНЕЦ КОНТРОЛЛЕРА: ПОЛУЧЕНИЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ - ОШИБКА ===');
      console.error('Ошибка при получении информации о пользователе:', error.message);
      console.error('Стек вызовов:', error.stack);
      return res.status(400).json({ error: error.message || 'Ошибка при получении информации о пользователе' });
    }
  }

  // Запрос на восстановление пароля
  async forgotPassword(req: Request, res: Response) {
    console.log('=== НАЧАЛО КОНТРОЛЛЕРА: ЗАПРОС НА ВОССТАНОВЛЕНИЕ ПАРОЛЯ ===');
    try {
      const { email } = req.body;
      console.log('Email для восстановления пароля:', email);
      
      // Валидация входных данных
      if (!email) {
        console.log('Ошибка валидации: отсутствует email');
        return res.status(400).json({ error: 'Необходимо указать email' });
      }
      
      // Отправляем запрос на восстановление
      console.log('Перед вызовом authService.forgotPassword');
      const result = await authService.forgotPassword({ email });
      console.log('После вызова authService.forgotPassword. Запрос обработан успешно');
      
      console.log('=== КОНЕЦ КОНТРОЛЛЕРА: ЗАПРОС НА ВОССТАНОВЛЕНИЕ ПАРОЛЯ - УСПЕХ ===');
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('=== КОНЕЦ КОНТРОЛЛЕРА: ЗАПРОС НА ВОССТАНОВЛЕНИЕ ПАРОЛЯ - ОШИБКА ===');
      console.error('Ошибка при запросе на восстановление пароля:', error.message);
      console.error('Стек вызовов:', error.stack);
      return res.status(400).json({ error: error.message || 'Ошибка при отправке запроса на восстановление пароля' });
    }
  }

  // Сброс пароля
  async resetPassword(req: Request, res: Response) {
    console.log('=== НАЧАЛО КОНТРОЛЛЕРА: СБРОС ПАРОЛЯ ===');
    try {
      const { token, newPassword } = req.body;
      console.log('Запрос на сброс пароля с токеном длиной:', token ? token.length : 0);
      
      // Валидация входных данных
      if (!token || !newPassword) {
        console.log('Ошибка валидации: отсутствует токен или новый пароль');
        return res.status(400).json({ error: 'Необходимо указать токен и новый пароль' });
      }
      
      // Сбрасываем пароль
      console.log('Перед вызовом authService.resetPassword');
      const result = await authService.resetPassword({ token, newPassword });
      console.log('После вызова authService.resetPassword. Пароль сброшен успешно');
      
      console.log('=== КОНЕЦ КОНТРОЛЛЕРА: СБРОС ПАРОЛЯ - УСПЕХ ===');
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('=== КОНЕЦ КОНТРОЛЛЕРА: СБРОС ПАРОЛЯ - ОШИБКА ===');
      console.error('Ошибка при сбросе пароля:', error.message);
      console.error('Стек вызовов:', error.stack);
      return res.status(400).json({ error: error.message || 'Ошибка при сбросе пароля' });
    }
  }
} 