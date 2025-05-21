
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const SubscriptionsTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Мои подписки</h2>
      
      <div className="space-y-4">
        <Card className="p-4">
          <Link to="/representative/profile/1" className="flex items-center hover:bg-honor-gray/10 p-2 rounded-lg transition-colors">
            <Avatar className="h-12 w-12 mr-4">
              <User size={24} />
            </Avatar>
            <div>
              <h3 className="font-medium">Иванов Иван Иванович</h3>
              <p className="text-sm text-honor-darkGray">Депутат городской думы</p>
            </div>
          </Link>
        </Card>
        
        <Card className="p-4">
          <Link to="/representative/profile/2" className="flex items-center hover:bg-honor-gray/10 p-2 rounded-lg transition-colors">
            <Avatar className="h-12 w-12 mr-4">
              <User size={24} />
            </Avatar>
            <div>
              <h3 className="font-medium">Петров Петр Петрович</h3>
              <p className="text-sm text-honor-darkGray">Глава администрации</p>
            </div>
          </Link>
        </Card>
        
        <div className="text-center pt-4">
          <Link to="/representatives">
            <Button className="honor-button-secondary">
              Найти больше представителей
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsTab;
