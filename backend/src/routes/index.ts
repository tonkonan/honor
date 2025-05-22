import { Router } from 'express';
import authRoutes from './auth.routes';

// Создаем главный роутер
const router = Router();

// Добавляем базовый маршрут для проверки API
router.get('/', (req, res) => {
  res.json({ message: 'API платформы "Честь" работает!' });
});

// Подключаем маршруты для разных модулей
router.use('/auth', authRoutes);

// Здесь в будущем будут подключаться другие маршруты:
// router.use('/users', userRoutes);
// router.use('/districts', districtRoutes);
// router.use('/tasks', taskRoutes);
// и т.д.

export default router; 