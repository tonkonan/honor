import { Request } from 'express';

// Расширяем тип Request, добавляя userId
export interface AuthRequest extends Request {
  userId: string;
} 