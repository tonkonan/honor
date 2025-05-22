
import { Transaction } from '@/components/balance';

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: 'income',
    description: 'Регистрация на платформе',
    amount: 10,
    date: '2025-05-01'
  },
  {
    id: 2,
    type: 'income',
    description: 'Приглашение друга',
    amount: 10,
    date: '2025-05-02'
  },
  {
    id: 3,
    type: 'income',
    description: 'Ежедневное посещение',
    amount: 1,
    date: '2025-05-03'
  },
  {
    id: 4,
    type: 'income',
    description: 'Просмотр рекламы',
    amount: 1,
    date: '2025-05-03'
  },
  {
    id: 5,
    type: 'income',
    description: '5 лайков',
    amount: 1,
    date: '2025-05-03'
  },
  {
    id: 6,
    type: 'expense',
    description: 'Создание задания',
    amount: -10,
    date: '2025-05-04'
  },
  {
    id: 7,
    type: 'expense',
    description: 'Сообщение представителю',
    amount: -10,
    date: '2025-05-04'
  }
];
