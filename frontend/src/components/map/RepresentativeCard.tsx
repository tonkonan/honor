
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, ChevronDown, TrendingUp, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RepresentativeCardProps {
  representative: any;
  onBack: () => void;
  onRequestMeeting: (id: number) => void;
}

const RepresentativeCard = ({ representative, onBack, onRequestMeeting }: RepresentativeCardProps) => {
  return (
    <div className="honor-card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <User className="text-honor-blue mr-2" size={24} />
          <h2 className="text-2xl font-bold">{representative.name}</h2>
        </div>
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="p-2 h-auto"
        >
          <ChevronDown size={20} />
        </Button>
      </div>
      
      <div className="text-honor-darkGray mb-4">
        <p className="font-medium">{representative.position}</p>
        <p className="text-sm">Тип: {representative.type}</p>
      </div>
      
      <div className="mb-6 space-y-4">
        <div className="bg-honor-gray p-3 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Рейтинг эффективности</span>
            <span className="font-bold text-honor-blue">{representative.rating}/5.0</span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div 
              className="bg-honor-blue h-2 rounded-full" 
              style={{ width: `${(representative.rating/5) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-honor-gray p-3 rounded-lg">
            <p className="text-xs text-honor-darkGray">Выполнено задач</p>
            <p className="font-bold text-honor-blue text-xl">{representative.tasksCompleted}</p>
          </div>
          <div className="bg-honor-gray p-3 rounded-lg">
            <p className="text-xs text-honor-darkGray">Посещаемость</p>
            <p className="font-bold text-honor-blue text-xl">{representative.attendance}%</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full honor-button-primary flex items-center gap-2">
              <Mail size={16} />
              Запросить встречу
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Запрос встречи с представителем</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm font-medium mb-2">Представитель:</p>
                <p>{representative.name}, {representative.position}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Выберите удобный формат встречи:</p>
                <RadioGroup defaultValue="personal" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <label htmlFor="personal">Личная встреча</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <label htmlFor="video">Видеоконференция</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone" />
                    <label htmlFor="phone">Телефонный звонок</label>
                  </div>
                </RadioGroup>
              </div>
              <Button 
                className="w-full" 
                onClick={() => onRequestMeeting(representative.id)}
              >
                Отправить запрос
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Link to={`/representative/profile/${representative.id}`}>
          <Button className="w-full honor-button-secondary">
            Полный профиль
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RepresentativeCard;
