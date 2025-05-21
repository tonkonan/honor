
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/components/ui/use-toast';
import { RegisterStep1, VerificationStep, RegisterFooter } from '@/components/voter';
import { GosuslugiAuthButton, SberAuthButton, TinkoffAuthButton } from '@/components/auth';
import { Separator } from '@/components/ui/separator';

const Register = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
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

  const handleSubmitStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь была бы проверка кода верификации и регистрация пользователя
    toast({
      title: "Регистрация успешна!",
      description: "Вы успешно зарегистрировались на платформе. Вам начислено 10 билетов!",
      variant: "default",
    });
    // В реальном приложении здесь был бы редирект на dashboard
    window.location.href = '/dashboard';
  };

  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Регистрация избирателя</h1>

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

          {step === 1 ? (
            <RegisterStep1 
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmitStep1}
            />
          ) : (
            <VerificationStep 
              verificationCode={formData.verificationCode}
              handleChange={handleChange}
              handleSubmit={handleSubmitStep2}
              goBack={() => setStep(1)}
            />
          )}

          <RegisterFooter />
          
          <div className="mt-6 text-center">
            <div className="text-sm text-honor-darkGray mb-2">
              Регистрация через сервисы идентификации позволит автоматически заполнить данные профиля и получить подтверждение вашей личности.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
