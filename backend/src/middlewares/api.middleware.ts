import { Request, Response, NextFunction } from 'express';

/**
 * Middleware для логирования API запросов
 */
export const apiLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Логируем все запросы к API
  console.log(`[API REQUEST] ${req.method} ${req.url}`);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  console.log('Params:', JSON.stringify(req.params, null, 2));
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  // Добавляем логирование ответа
  const originalSend = res.send;
  res.send = function(body) {
    console.log(`[API RESPONSE] ${req.method} ${req.url} Status: ${res.statusCode}`);
    console.log('Response Body:', typeof body === 'string' ? body.substring(0, 500) : '[Object]');
    console.log(`Response Time: ${Date.now() - start}ms`);
    
    return originalSend.call(this, body);
  };
  
  next();
}; 