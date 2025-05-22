import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

// API URL
const API_URL = 'http://localhost:3000/api';

// Типы данных
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  district?: string;
  verified?: boolean;
  isRepresentative?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGosuslugi: () => void;
  isVerified: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Настраиваем перехватчик запросов для добавления токена
  useEffect(() => {
    // Получаем токен из localStorage
    const token = localStorage.getItem('honorToken');
    
    if (token) {
      // Устанавливаем заголовок Authorization для всех запросов
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    // Очищаем при размонтировании
    return () => {
      delete axios.defaults.headers.common['Authorization'];
    };
  }, []);

  // Check for stored user data on component mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem('honorUser');
        const token = localStorage.getItem('honorToken');
        
        if (storedUser && token) {
          // Устанавливаем заголовок авторизации
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          try {
            // Можно сделать запрос на /api/auth/me для проверки валидности токена
            // и получения актуальных данных пользователя
            // const response = await axios.get(`${API_URL}/auth/me`);
            // setUser(response.data);
            
            // Пока просто используем данные из localStorage
            setUser(JSON.parse(storedUser));
          } catch (e) {
            // Если токен невалидный или истек, удаляем данные пользователя
            localStorage.removeItem('honorUser');
            localStorage.removeItem('honorToken');
            delete axios.defaults.headers.common['Authorization'];
          }
        }
      } catch (e) {
        localStorage.removeItem('honorUser');
        localStorage.removeItem('honorToken');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Выполняем реальный запрос к API
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      // Сохраняем данные пользователя и токен
      setUser(response.data.user);
      localStorage.setItem('honorUser', JSON.stringify(response.data.user));
      localStorage.setItem('honorToken', response.data.token);
      
      // Устанавливаем заголовок авторизации для всех последующих запросов
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      toast({
        title: "Вход выполнен!",
        description: "Вы успешно вошли в систему.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка входа",
        description: error.response?.data?.error || "Неверный email или пароль.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGosuslugi = () => {
    // In a real app, this would redirect to the Госуслуги OAuth endpoint
    window.location.href = '/gosuslugi/auth';
    
    // Since we can't actually integrate with Госуслуги in this demo, 
    // we'll simulate the process in the GosuslugiCallback component
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('honorUser');
    localStorage.removeItem('honorToken');
    delete axios.defaults.headers.common['Authorization'];
    
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из системы.",
      variant: "default",
    });
  };

  const isVerified = () => {
    return user?.verified || false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, loginWithGosuslugi, isVerified }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
