
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { gosuslugiAuth } from '@/services/gosuslugiAuth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const GosuslugiCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processCallback = async () => {
    try {
      // Get URL parameters
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      
      if (!code) {
        // Instead of throwing an error for missing code, we'll handle it gracefully
        setError('Отсутствует код авторизации. Пожалуйста, попробуйте войти снова.');
        setIsLoading(false);
        return;
      }
      
      if (!state) {
        setError('Отсутствуют данные о типе пользователя. Пожалуйста, попробуйте снова.');
        setIsLoading(false);
        return;
      }
      
      const isRepresentative = state === 'representative';
      
      // Exchange code for token
      const token = await gosuslugiAuth.exchangeCodeForToken(code);
      
      // Get user info
      const userData = await gosuslugiAuth.getUserInfo(token.access_token, isRepresentative);
      
      // Map to app format
      const appUser = gosuslugiAuth.mapUserDataToAppFormat(userData, isRepresentative);
      
      // Store user in localStorage
      localStorage.setItem('honorUser', JSON.stringify(appUser));
      
      // Show success message
      toast({
        title: "Вход выполнен успешно!",
        description: "Вы успешно вошли через Госуслуги",
      });
      
      // Redirect based on user type
      navigate(isRepresentative ? '/representative/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Error during Госуслуги authentication:', error);
      setError('Произошла ошибка при авторизации. Пожалуйста, попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate(user.isRepresentative ? '/representative/dashboard' : '/dashboard');
      return;
    }
    
    processCallback();
  }, [user, navigate]);
  
  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-6">Авторизация через Госуслуги</h1>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-honor-blue" />
              <p>Выполняется вход...</p>
            </div>
          ) : error ? (
            <div className="mt-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
              </div>
              <Button onClick={() => navigate('/login')} className="honor-button-primary">
                Вернуться на страницу входа
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p>Авторизация выполнена успешно. Перенаправляем вас...</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GosuslugiCallback;
