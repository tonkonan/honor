
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Plus } from 'lucide-react';

const UserProfileSidebar = () => {
  return (
    <Card className="honor-card mb-6">
      <div className="flex flex-col items-center p-6">
        <Avatar className="h-24 w-24 mb-4">
          <User size={48} />
        </Avatar>
        <h1 className="text-2xl font-bold">Иван Петров</h1>
        <p className="text-honor-darkGray">Избиратель</p>
        <div className="flex items-center mt-2">
          <MapPin size={16} className="text-honor-blue mr-1" />
          <span className="text-sm">Округ №1</span>
        </div>
        <Badge className="mt-2 bg-honor-blue">10 баллов активности</Badge>
      </div>

      <div className="border-t border-b py-4 mb-4">
        <div className="grid grid-cols-3 text-center">
          <div>
            <p className="text-2xl font-bold text-honor-blue">5</p>
            <p className="text-xs text-honor-darkGray">Заданий</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-honor-blue">12</p>
            <p className="text-xs text-honor-darkGray">Реакций</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-honor-blue">35</p>
            <p className="text-xs text-honor-darkGray">Билетов</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Мой представитель</h3>
        <Link to="/representative/profile/1" className="flex items-center p-3 border rounded-xl hover:bg-honor-gray transition-colors">
          <div className="bg-honor-gray rounded-full p-2 mr-3">
            <User size={24} className="text-honor-blue" />
          </div>
          <div>
            <p className="font-medium">Иванов Иван Иванович</p>
            <p className="text-sm text-honor-darkGray">Депутат городской думы</p>
          </div>
        </Link>
        
        <h3 className="text-lg font-semibold mt-6 mb-4">Быстрые действия</h3>
        <div className="space-y-3">
          <Link to="/tasks/create">
            <Button className="w-full honor-button-primary flex items-center justify-center">
              <Plus size={18} className="mr-2" />
              Создать задание
            </Button>
          </Link>
          <Link to="/map">
            <Button className="w-full honor-button-secondary flex items-center justify-center">
              <MapPin size={18} className="mr-2" />
              Открыть карту округов
            </Button>
          </Link>
          <Link to="/balance">
            <Button className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-honor-darkGray">
              <Plus size={18} className="mr-2" />
              Пополнить баланс
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default UserProfileSidebar;
