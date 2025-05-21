
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { GosuslugiAuthButton, SberAuthButton, TinkoffAuthButton } from '@/components/auth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Вход выполнен успешно!",
        description: "Добро пожаловать в систему «Честь»",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: "Неверный email или пароль. Пожалуйста, проверьте данные и попробуйте снова.",
        variant: "destructive",
      });
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Вход в систему</h1>

          <div className="flex flex-col gap-3 mb-6">
            <GosuslugiAuthButton />
            <SberAuthButton />
            <TinkoffAuthButton />
          </div>
          
          <div className="flex items-center my-6">
            <Separator className="flex-grow" />
            <span className="px-4 text-sm text-honor-darkGray">или</span>
            <Separator className="flex-grow" />
          </div>

          <form onSubmit={handleSubmit} className="honor-card">
            <div className="mb-6">
              <Label htmlFor="email" className="block mb-2">Электронная почта или телефон</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="honor-input pl-10"
                  placeholder="example@mail.ru"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <Label htmlFor="password">Пароль</Label>
                <Link to="/forgot-password" className="text-sm text-honor-blue hover:underline">
                  Забыли пароль?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="honor-input pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full honor-button-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Выполняется вход...' : 'Войти'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-honor-darkGray">
              Еще не зарегистрированы?{' '}
              <Link to="/register" className="text-honor-blue hover:underline">
                Регистрация
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <GosuslugiAuthButton isRepresentative={true} className="max-w-xs mx-auto mb-2" />
            <SberAuthButton isRepresentative={true} className="max-w-xs mx-auto mb-2" />
            <TinkoffAuthButton isRepresentative={true} className="max-w-xs mx-auto" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
