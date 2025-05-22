
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  CheckCircle
} from 'lucide-react';

// Message type definition
type Message = {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  unread: boolean;
};

// Mock data
const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Иванов Иван",
    text: "Добрый день! Хотел узнать о планах по ремонту дороги на ул. Ленина.",
    timestamp: "2025-05-04",
    unread: true
  },
  {
    id: 2,
    sender: "Петрова Мария",
    text: "Здравствуйте! Когда будет построена новая школа в микрорайоне?",
    timestamp: "2025-05-03",
    unread: true
  },
  {
    id: 3,
    sender: "Сидоров Алексей",
    text: "Спасибо за помощь с решением проблемы освещения в нашем дворе!",
    timestamp: "2025-05-02",
    unread: false
  }
];

const MessagesTab = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Новые сообщения</h2>
      
      <div className="space-y-4">
        {mockMessages.map(message => (
          <Card key={message.id} className={`p-4 ${message.unread ? 'bg-blue-50' : 'bg-white'}`}>
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-3 mt-1">
                <User size={20} />
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">
                    {message.sender}
                    {message.unread && (
                      <Badge className="ml-2 bg-honor-blue text-white text-xs">Новое</Badge>
                    )}
                  </h3>
                  <span className="text-xs text-honor-darkGray">
                    {new Date(message.timestamp).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <p className="text-sm mt-1">{message.text}</p>
                <div className="flex space-x-2 mt-3">
                  <Link to="/messages" className="flex-1">
                    <Button className="w-full honor-button-primary text-sm py-1">
                      Ответить
                    </Button>
                  </Link>
                  {message.unread && (
                    <Button className="text-sm py-1 px-3 bg-gray-100 hover:bg-gray-200 text-honor-darkGray">
                      Пометить как прочитанное
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {mockMessages.length === 0 && (
          <div className="text-center py-10">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <p className="text-honor-darkGray">У вас нет новых сообщений</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <Link to="/messages">
          <Button className="honor-button-secondary">
            Перейти в центр сообщений
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MessagesTab;
