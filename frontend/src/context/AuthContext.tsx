
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  verified: boolean;
  isRepresentative: boolean;
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

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('honorUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('honorUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This would be a real API call in a production app
    setLoading(true);
    try {
      // Mock login
      const mockUser: User = {
        id: '1',
        fullName: 'Иван Иванов',
        email,
        phone: '+7 (999) 999-99-99',
        district: 'Округ №3',
        verified: false,
        isRepresentative: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('honorUser', JSON.stringify(mockUser));
      
      toast({
        title: "Вход выполнен!",
        description: "Вы успешно вошли в систему.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: "Неверный email или пароль.",
        variant: "destructive",
      });
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
