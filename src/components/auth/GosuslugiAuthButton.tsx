
import React from 'react';
import { Button } from '@/components/ui/button';
import { gosuslugiAuth } from '@/services/gosuslugiAuth';
import { useToast } from '@/components/ui/use-toast';
import gosUslugiLogo from '@/assets/gosuslugi-logo.svg';

interface GosuslugiAuthButtonProps {
  isRepresentative?: boolean;
  className?: string;
}

const GosuslugiAuthButton: React.FC<GosuslugiAuthButtonProps> = ({ isRepresentative = false, className }) => {
  const { toast } = useToast();
  
  const handleClick = () => {
    try {
      gosuslugiAuth.initiateLogin(isRepresentative);
      toast({
        title: "Перенаправление на Госуслуги",
        description: "Сейчас вы будете перенаправлены на портал Госуслуг для авторизации"
      });
    } catch (error) {
      toast({
        title: "Ошибка авторизации",
        description: "Не удалось выполнить вход через Госуслуги. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-[#0065B1] hover:bg-[#00539C] text-white p-2 flex items-center justify-center w-full ${className}`}
      type="button"
    >
      <div className="flex items-center">
        <img 
          src={gosUslugiLogo} 
          alt="Госуслуги" 
          className="h-6 w-6 mr-2 bg-white rounded p-[2px]"
        />
        <span>
          {isRepresentative
            ? 'Войти как представитель власти'
            : 'Войти через Госуслуги'}
        </span>
      </div>
    </Button>
  );
};

export default GosuslugiAuthButton;
