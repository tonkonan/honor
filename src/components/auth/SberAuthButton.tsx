
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface SberAuthButtonProps {
  isRepresentative?: boolean;
  className?: string;
}

const SberAuthButton: React.FC<SberAuthButtonProps> = ({ isRepresentative = false, className }) => {
  const { toast } = useToast();
  
  const handleClick = () => {
    try {
      // In a real app, this would be replaced with the actual Sber ID authentication flow
      window.location.href = '/sber/auth?user_type=' + (isRepresentative ? 'representative' : 'voter');
      
      toast({
        title: "Перенаправление на Сбер ID",
        description: "Сейчас вы будете перенаправлены на страницу авторизации Сбер ID"
      });
    } catch (error) {
      toast({
        title: "Ошибка авторизации",
        description: "Не удалось выполнить вход через Сбер ID. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-[#21A038] hover:bg-[#1C8A30] text-white p-2 flex items-center justify-center w-full ${className}`}
      type="button"
    >
      <div className="flex items-center">
        <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="white"/>
          <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="#21A038"/>
          <path d="M12 7.5V16.5M7.5 12H16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>
          {isRepresentative
            ? 'Войти через Сбер ID как представитель'
            : 'Войти через Сбер ID'}
        </span>
      </div>
    </Button>
  );
};

export default SberAuthButton;
