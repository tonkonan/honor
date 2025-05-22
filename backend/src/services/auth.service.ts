import prisma from '../config/database';
import { 
  RegisterUserInput, 
  LoginUserInput, 
  AuthResponse, 
  ForgotPasswordInput,
  ResetPasswordInput,
  UserRole,
  User
} from '../types/user';
import { 
  hashPassword, 
  comparePasswords, 
  generateToken, 
  excludePassword 
} from '../utils/auth';
import { v4 as uuidv4 } from 'uuid';

// Сервис для работы с аутентификацией
export class AuthService {
  // Регистрация пользователя
  async register(userData: RegisterUserInput): Promise<AuthResponse> {
    console.log('=== НАЧАЛО AUTH_SERVICE.REGISTER ===');
    console.log('Входные данные:', JSON.stringify(userData, null, 2));
    
    try {
      // Вывод дополнительного отладочного сообщения
      console.log('ВНИМАНИЕ! НАЧАЛО РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ!');
      
      // Прямой SQL запрос для проверки подключения
      try {
        const testQuery = await prisma.$queryRaw`SELECT NOW() as time, current_database() as db`;
        console.log('Тестовый запрос к базе данных успешен:', testQuery);
      } catch (sqlError) {
        console.error('ОШИБКА ТЕСТОВОГО SQL ЗАПРОСА:', sqlError);
      }
      
      // Проверяем, существует ли пользователь с таким email
      console.log('Поиск существующего пользователя по email:', userData.email);
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });
      console.log('Результат поиска пользователя:', existingUser);

      if (existingUser) {
        console.log('Пользователь с таким email уже существует');
        throw new Error('Пользователь с таким email уже существует');
      }

      // Хешируем пароль
      console.log('Хеширование пароля...');
      const hashedPassword = await hashPassword(userData.password);
      console.log('Пароль успешно хеширован');

      // Создаем ID пользователя
      const userId = uuidv4();
      console.log('Сгенерирован ID пользователя:', userId);

      try {
        // Создаем пользователя через Prisma ORM
        console.log('Создание пользователя через Prisma ORM...');
        const newUser = await prisma.user.create({
          data: {
            id: uuidv4(),
            email: userData.email,
            password: hashedPassword,
            fullName: userData.fullName,
            phone: userData.phone || null,
            district: userData.district || null,
            address: userData.address || null,
            role: userData.role || 'CITIZEN'
          }
        });
        console.log('Результат создания пользователя:', newUser);
        
        // Проверяем, что пользователь создан
        const verifyUser = await prisma.user.findUnique({
          where: { id: userId }
        });
        console.log('Проверка создания пользователя SQL запросом:', verifyUser);
        
        if (!verifyUser) {
          console.error('КРИТИЧЕСКАЯ ОШИБКА: Пользователь не был создан!');
          throw new Error('Ошибка создания пользователя: запись не найдена после вставки');
        }
        
        // Генерируем JWT токен
        console.log('Генерация JWT токена');
        const token = generateToken(newUser.id);
        console.log('Токен успешно сгенерирован');

        // Адаптируем к нашему типу User и исключаем пароль
        const adaptedUser = {
          ...newUser,
          role: newUser.role as unknown as UserRole,
          phone: newUser.phone,
          district: newUser.district,
          address: newUser.address
        };
        const safeUser = excludePassword(adaptedUser);

        console.log('=== КОНЕЦ AUTH_SERVICE.REGISTER - УСПЕХ ===');
        return {
          user: safeUser,
          token
        };
      } catch (createError: any) {
        console.error('КРИТИЧЕСКАЯ ОШИБКА ПРИ СОЗДАНИИ ПОЛЬЗОВАТЕЛЯ:');
        console.error('Сообщение об ошибке:', createError.message);
        console.error('Стек вызовов:', createError.stack);
        
        if (createError.code) {
          console.error('Код ошибки:', createError.code);
        }
        
        throw new Error(`Ошибка создания пользователя: ${createError.message}`);
      }
    } catch (error: any) {
      console.error('=== КОНЕЦ AUTH_SERVICE.REGISTER - ОШИБКА ===');
      console.error('Ошибка:', error.message);
      console.error('Стек вызовов:', error.stack);
      throw error;
    }
  }

  // Вход пользователя
  async login(credentials: LoginUserInput): Promise<AuthResponse> {
    console.log('=== НАЧАЛО AUTH_SERVICE.LOGIN ===');
    console.log('Входные данные:', JSON.stringify({ email: credentials.email }, null, 2));
    
    try {
      // Ищем пользователя по email
      console.log('Поиск пользователя по email:', credentials.email);
      const user = await prisma.user.findUnique({
        where: { email: credentials.email }
      });
      console.log('Результат поиска пользователя:', user ? 'Пользователь найден' : 'Пользователь не найден');

      // Если пользователь не найден
      if (!user) {
        console.log('Пользователь не найден');
        throw new Error('Неверный email или пароль');
      }

      // Проверяем пароль
      console.log('Проверка пароля...');
      const isPasswordValid = await comparePasswords(credentials.password, user.password);
      console.log('Результат проверки пароля:', isPasswordValid ? 'Пароль верный' : 'Пароль неверный');

      if (!isPasswordValid) {
        console.log('Пароль неверный');
        throw new Error('Неверный email или пароль');
      }

      // Генерируем JWT токен
      console.log('Генерация JWT токена');
      const token = generateToken(user.id);
      console.log('Токен успешно сгенерирован');

      // Адаптируем к нашему типу User и исключаем пароль
      const adaptedUser: User = {
        ...user,
        role: user.role as unknown as UserRole,
      };
      const safeUser = excludePassword(adaptedUser);

      console.log('=== КОНЕЦ AUTH_SERVICE.LOGIN - УСПЕХ ===');
      return {
        user: safeUser,
        token
      };
    } catch (error: any) {
      console.error('=== КОНЕЦ AUTH_SERVICE.LOGIN - ОШИБКА ===');
      console.error('Ошибка:', error.message);
      console.error('Стек вызовов:', error.stack);
      throw error;
    }
  }

  // Получение информации о текущем пользователе
  async getCurrentUser(userId: string) {
    console.log('=== НАЧАЛО AUTH_SERVICE.GET_CURRENT_USER ===');
    console.log('ID пользователя:', userId);
    
    try {
      // Ищем пользователя по ID
      console.log('Поиск пользователя по ID:', userId);
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      console.log('Результат поиска пользователя:', user ? 'Пользователь найден' : 'Пользователь не найден');

      if (!user) {
        console.log('Пользователь не найден');
        throw new Error('Пользователь не найден');
      }

      // Адаптируем к нашему типу User и исключаем пароль
      const adaptedUser: User = {
        ...user,
        role: user.role as unknown as UserRole,
      };
      const safeUser = excludePassword(adaptedUser);

      console.log('=== КОНЕЦ AUTH_SERVICE.GET_CURRENT_USER - УСПЕХ ===');
      return safeUser;
    } catch (error: any) {
      console.error('=== КОНЕЦ AUTH_SERVICE.GET_CURRENT_USER - ОШИБКА ===');
      console.error('Ошибка:', error.message);
      console.error('Стек вызовов:', error.stack);
      throw error;
    }
  }

  // Запрос на восстановление пароля
  async forgotPassword(data: ForgotPasswordInput) {
    console.log('=== НАЧАЛО AUTH_SERVICE.FORGOT_PASSWORD ===');
    console.log('Email для восстановления:', data.email);
    
    try {
      // Ищем пользователя по email
      console.log('Поиск пользователя по email:', data.email);
      const user = await prisma.user.findUnique({
        where: { email: data.email }
      });
      console.log('Результат поиска пользователя:', user ? 'Пользователь найден' : 'Пользователь не найден');

      // По соображениям безопасности всегда возвращаем один и тот же ответ
      console.log('=== КОНЕЦ AUTH_SERVICE.FORGOT_PASSWORD - УСПЕХ ===');
      return { message: 'Если пользователь с таким email существует, инструкции по сбросу пароля будут отправлены' };
    } catch (error: any) {
      console.error('=== КОНЕЦ AUTH_SERVICE.FORGOT_PASSWORD - ОШИБКА ===');
      console.error('Ошибка:', error.message);
      console.error('Стек вызовов:', error.stack);
      throw error;
    }
  }

  // Сброс пароля
  async resetPassword(data: ResetPasswordInput) {
    console.log('=== НАЧАЛО AUTH_SERVICE.RESET_PASSWORD ===');
    console.log('Токен для сброса пароля:', data.token ? 'Присутствует' : 'Отсутствует');
    
    try {
      // Здесь должна быть проверка токена и нахождение пользователя
      // Для примера используем заглушку
      console.log('Хеширование нового пароля...');
      const hashedPassword = await hashPassword(data.newPassword);
      console.log('Пароль успешно хеширован');

      console.log('=== КОНЕЦ AUTH_SERVICE.RESET_PASSWORD - УСПЕХ ===');
      return { message: 'Пароль успешно сброшен' };
    } catch (error: any) {
      console.error('=== КОНЕЦ AUTH_SERVICE.RESET_PASSWORD - ОШИБКА ===');
      console.error('Ошибка:', error.message);
      console.error('Стек вызовов:', error.stack);
      throw error;
    }
  }
} 