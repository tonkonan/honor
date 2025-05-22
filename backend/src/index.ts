import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { connectToDatabase, disconnectFromDatabase, testConnection } from './config/database';

// Загружаем переменные окружения
dotenv.config();

// Проверяем настройки подключения к базе данных
console.log('DATABASE_URL из переменных окружения:', process.env.DATABASE_URL || 'Не определен');

// Создаем экземпляр приложения
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Добавляем middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Заголовки:', JSON.stringify(req.headers, null, 2));
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Тело запроса:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Подключаем маршруты API
app.use('/api', routes);

// Простой тестовый маршрут
app.get('/', (req, res) => {
  res.json({ message: 'API работает! Проект "Честь" запущен.' });
});

// Маршрут для проверки подключения к базе данных
app.get('/api/db-check', async (req, res) => {
  try {
    const result = await testConnection();
    res.json({ 
      success: result, 
      message: result ? 'Подключение к базе данных работает' : 'Ошибка подключения к базе данных' 
    });
  } catch (error) {
    console.error('Ошибка при проверке подключения к базе данных:', error);
    res.status(500).json({ success: false, error: 'Ошибка при проверке подключения к базе данных' });
  }
});

// Обработка ошибок
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Ошибка сервера:', err);
  console.error('Стек вызовов:', err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Обработчик запросов к несуществующим маршрутам
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Запуск сервера
const startServer = async () => {
  try {
    // Подключаемся к базе данных
    await connectToDatabase();
    
    // Проверяем подключение к базе
    console.log('Проверка подключения к базе данных после инициализации сервера...');
    const testResult = await testConnection();
    console.log('Результат проверки:', testResult ? 'Успешно' : 'Ошибка');
    
    // Запускаем сервер
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
      console.log(`API доступно по адресу: http://localhost:${PORT}/api`);
    });
    
    // Обработка сигналов завершения для корректного закрытия соединений
    process.on('SIGINT', async () => {
      await disconnectFromDatabase();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      await disconnectFromDatabase();
      process.exit(0);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
    process.exit(1);
  }
};

// Запускаем сервер
startServer(); 