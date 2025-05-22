
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface TinkoffAuthButtonProps {
  isRepresentative?: boolean;
  className?: string;
}

const TinkoffAuthButton: React.FC<TinkoffAuthButtonProps> = ({ isRepresentative = false, className }) => {
  const { toast } = useToast();
  
  const handleClick = () => {
    try {
      // In a real app, this would be replaced with the actual Tinkoff ID authentication flow
      window.location.href = '/tinkoff/auth?user_type=' + (isRepresentative ? 'representative' : 'voter');
      
      toast({
        title: "Перенаправление на Тинькофф ID",
        description: "Сейчас вы будете перенаправлены на страницу авторизации Тинькофф ID"
      });
    } catch (error) {
      toast({
        title: "Ошибка авторизации",
        description: "Не удалось выполнить вход через Тинькофф ID. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-[#FFDD2D] hover:bg-[#FFCE00] text-black p-2 flex items-center justify-center w-full ${className}`}
      type="button"
    >
      <div className="flex items-center">
        <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="black"/>
          <path d="M6 9H18V15H6V9Z" fill="#FFDD2D"/>
        </svg>
        <span>
          {isRepresentative
            ? 'Войти через Тинькофф ID как представитель'
            : 'Войти через Тинькофф ID'}
        </span>
      </div>
    </Button>
  );
};

export default TinkoffAuthButton;
