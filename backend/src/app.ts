import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { apiLoggerMiddleware } from './middlewares/api.middleware';

// Создаем экземпляр приложения Express
const app = express();

// Устанавливаем заголовки безопасности с помощью Helmet
app.use(helmet());

// Включаем CORS
app.use(cors());

// Используем Morgan для логирования запросов в консоль
app.use(morgan('dev'));

// Парсер для JSON
app.use(express.json());

// Парсер для URL-encoded форм
app.use(express.urlencoded({ extended: true }));

// Добавляем middleware для логирования API запросов
app.use('/api', apiLoggerMiddleware);

// Устанавливаем маршруты API
app.use('/api', routes);

// Устанавливаем корневой маршрут
app.get('/', (req, res) => {
  res.json({ message: 'API сервера Honor доступно по адресу /api' });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Путь не найден' });
});

export default app; 