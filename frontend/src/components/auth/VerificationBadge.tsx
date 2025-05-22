
import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VerificationBadgeProps {
  verificationLevel: number;
  className?: string;
  showLabel?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  verificationLevel, 
  className = '',
  showLabel = false
}) => {
  let icon;
  let label;
  let color;

  switch (verificationLevel) {
    case 3: // Подтвержденная учетная запись
      icon = <ShieldCheck className="text-green-500" size={showLabel ? 16 : 20} />;
      label = "Учетная запись подтверждена";
      color = "bg-green-100 text-green-700";
      break;
    case 2: // Стандартная учетная запись
      icon = <Shield className="text-blue-500" size={showLabel ? 16 : 20} />;
      label = "Учетная запись стандартная";
      color = "bg-blue-100 text-blue-700";
      break;
    case 1: // Упрощенная учетная запись
    default:
      icon = <ShieldAlert className="text-amber-500" size={showLabel ? 16 : 20} />;
      label = "Учетная запись упрощенная";
      color = "bg-amber-100 text-amber-700";
      break;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center ${className}`}>
            {icon}
            {showLabel && (
              <span className={`text-xs ml-1 px-2 py-1 rounded-full ${color}`}>{label}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
          {verificationLevel === 3 && (
            <p className="text-xs">Идентификация личности подтверждена</p>
          )}
          {verificationLevel === 2 && (
            <p className="text-xs">Личные данные подтверждены</p>
          )}
          {verificationLevel === 1 && (
            <p className="text-xs">Требуется дополнительная верификация</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
