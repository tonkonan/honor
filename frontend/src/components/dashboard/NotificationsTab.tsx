
import React from 'react';
import { Card } from '@/components/ui/card';
import { Bell } from 'lucide-react';

// Mock data
const mockNotifications = [
  {
    id: 1,
    title: "Новый ответ на ваше задание",
    text: "Представитель Иванов И.И. ответил на ваше задание",
    date: "2025-05-04",
    read: false
  },
  {
    id: 2,
    title: "Изменение статуса задания",
    text: "Задание «Ремонт дороги» перешло на новый этап",
    date: "2025-05-03",
    read: true
  },
  {
    id: 3,
    title: "Новая публикация",
    text: "От представителя, на которого вы подписаны",
    date: "2025-05-02",
    read: true
  }
];

const NotificationsTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Уведомления</h2>
      
      <div className="space-y-4">
        {mockNotifications.map(notification => (
          <Card key={notification.id} className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
            <div className="flex items-start">
              <div className={`rounded-full p-2 mr-3 ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                <Bell size={18} className={notification.read ? 'text-honor-darkGray' : 'text-honor-blue'} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-honor-darkGray">
                    {new Date(notification.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <p className="text-sm text-honor-darkGray mt-1">{notification.text}</p>
              </div>
            </div>
          </Card>
        ))}
        
        {mockNotifications.length === 0 && (
          <div className="text-center py-10">
            <p className="text-honor-darkGray">У вас нет новых уведомлений</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
