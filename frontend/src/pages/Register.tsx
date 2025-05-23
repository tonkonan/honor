import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/components/ui/use-toast';
import { RegisterStep1, VerificationStep, RegisterFooter } from '@/components/voter';
import { GosuslugiAuthButton, SberAuthButton, TinkoffAuthButton } from '@/components/auth';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

// Определяем типы сообщений
type SuccessViewProps = {
  onContinue: () => void;
  fullName: string;
};

// API URL
const API_URL = 'http://localhost:3000/api';

// Компонент успешной регистрации
const SuccessView = ({ onContinue, fullName }: SuccessViewProps) => {
  return (
    <div className="honor-card text-center">
      <CheckCircle className="mx-auto text-green-500" size={64} />
      <h2 className="text-2xl font-bold mt-4 mb-2">Пользователь успешно создан</h2>
      <p className="mb-6">
        {fullName}, ваша учетная запись была успешно создана в системе "Честь".
      </p>
      <Button onClick={onContinue} className="w-full honor-button-primary">
        ОК
      </Button>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: 'password123', // Установка дефолтного пароля
    district: '',
    address: '',
    useAddress: false,
    verificationCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы запрос на отправку кода верификации
    toast({
      title: "Код подтверждения отправлен",
      description: "Мы отправили код подтверждения на указанный вами номер телефона",
      variant: "default",
    });
    setStep(2);
  };

  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    // Проверяем, что код верификации правильный (00000)
    if (formData.verificationCode === '00000') {
      try {
        setLoading(true);
        // Отправляем запрос на регистрацию на бэкенд
        await axios.post(`${API_URL}/auth/register`, {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
          district: formData.useAddress ? '' : formData.district,
          address: formData.useAddress ? formData.address : '',
          role: 'CITIZEN'
        });
        // После успешной регистрации сразу логиним пользователя
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } catch (error: any) {
        const errorMsg = error.response?.data?.error || "Произошла ошибка при регистрации";
        // Если ошибка про существующего пользователя или 'запись не найдена после вставки' — пробуем залогинить
        if (
          errorMsg.includes('существует') ||
          errorMsg.includes('запись не найдена после вставки')
        ) {
          try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
            return;
          } catch {
            toast({
              title: "Ошибка регистрации",
              description: errorMsg,
              variant: "destructive",
            });
            return;
          }
        }
        toast({
          title: "Ошибка регистрации",
          description: errorMsg,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Ошибка проверки",
        description: "Неверный код подтверждения. Пожалуйста, проверьте код и попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  const handleContinueAfterSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Регистрация избирателя</h1>

          {step < 3 && (
            <>
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
            </>
          )}

          {step === 1 ? (
            <RegisterStep1 
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmitStep1}
            />
          ) : step === 2 ? (
            <VerificationStep 
              verificationCode={formData.verificationCode}
              handleChange={handleChange}
              handleSubmit={handleSubmitStep2}
              goBack={() => setStep(1)}
              loading={loading}
            />
          ) : (
            <SuccessView
              fullName={formData.fullName}
              onContinue={handleContinueAfterSuccess}
            />
          )}

          {step < 3 && <RegisterFooter />}
          
          {step < 3 && (
            <div className="mt-6 text-center">
              <div className="text-sm text-honor-darkGray mb-2">
                Регистрация через сервисы идентификации позволит автоматически заполнить данные профиля и получить подтверждение вашей личности.
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Register;
