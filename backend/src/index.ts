import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
// import { connectToDatabase, disconnectFromDatabase } from './config/database';

// Загружаем переменные окружения
dotenv.config();

// Создаем экземпляр приложения
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключаем маршруты API
app.use('/api', routes);

// Простой тестовый маршрут
app.get('/', (req, res) => {
  res.json({ message: 'API работает! Проект "Честь" запущен.' });
});

// Обработка ошибок
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Обработчик запросов к несуществующим маршрутам
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Запуск сервера
const startServer = async () => {
  try {
    // Временно отключаем подключение к базе данных для тестирования API
    // await connectToDatabase();
    
    // Запускаем сервер
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
    
    // Обработка сигналов завершения для корректного закрытия соединений
    process.on('SIGINT', async () => {
      // await disconnectFromDatabase();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      // await disconnectFromDatabase();
      process.exit(0);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
    process.exit(1);
  }
};

// Запускаем сервер
startServer(); 