
import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquare, Edit, AlertTriangle } from 'lucide-react';

const UsageTab = () => {
  return (
    <Card className="honor-card mb-6">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Использование билетов</h2>
        <p className="text-honor-darkGray mb-6">
          Билеты можно использовать для следующих действий на платформе:
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-honor-blue/10 p-3 rounded-full mr-4">
              <MessageSquare size={24} className="text-honor-blue" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Сообщение представителю власти</h3>
              <p className="text-honor-darkGray">
                Отправка личного сообщения представителю власти через систему сообщений
              </p>
              <p className="text-lg font-semibold text-honor-blue mt-1">10 билетов</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-honor-blue/10 p-3 rounded-full mr-4">
              <Edit size={24} className="text-honor-blue" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Создание задания</h3>
              <p className="text-honor-darkGray">
                Создание нового задания для представителя власти с указанием проблемы, которую необходимо решить
              </p>
              <p className="text-lg font-semibold text-honor-blue mt-1">10 билетов</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start">
              <AlertTriangle size={20} className="text-amber-600 mr-2 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Важно!</h3>
                <p className="text-honor-darkGray">
                  Билеты используются для поддержания конструктивного диалога между избирателями и представителями власти. 
                  Система билетов помогает предотвратить спам и повышает качество коммуникации на платформе.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UsageTab;
