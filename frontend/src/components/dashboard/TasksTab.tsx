
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Plus, 
  ThumbsUp, 
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import EscalateTask from './EscalateTask';

// Mock data
const mockTasks = [
  {
    id: 1,
    title: "Ремонт дороги на ул. Ленина",
    address: "ул. Ленина, 10-20",
    status: "in-progress",
    date: "2025-08-15",
    likes: 24,
    comments: 5,
    createdAt: "2025-05-01",
    lastResponseDays: 14
  },
  {
    id: 2,
    title: "Установка детской площадки",
    address: "ул. Пушкина, 42",
    status: "completed",
    date: "2025-04-20",
    likes: 56,
    comments: 12,
    createdAt: "2025-03-15",
    lastResponseDays: 2
  }
];

const TasksTab = () => {
  const [escalatingTask, setEscalatingTask] = useState<{ id: number, title: string } | null>(null);

  const needsEscalation = (days: number) => days > 7;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Мои задания</h2>
        <Link to="/tasks/create">
          <Button className="honor-button-primary flex items-center">
            <Plus size={18} className="mr-2" />
            Создать задание
          </Button>
        </Link>
      </div>
      
      <Dialog open={!!escalatingTask} onOpenChange={(open) => !open && setEscalatingTask(null)}>
        <DialogContent className="sm:max-w-lg">
          <EscalateTask 
            taskId={escalatingTask?.id.toString()}
            taskTitle={escalatingTask?.title}
            onCancel={() => setEscalatingTask(null)}
          />
        </DialogContent>
      </Dialog>
      
      {mockTasks.map(task => (
        <Card key={task.id} className="honor-card">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <Badge className={
              task.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : task.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-orange-100 text-orange-800'
            }>
              {task.status === 'completed' ? 'Выполнено' : 
               task.status === 'in-progress' ? 'В процессе' : 
               'Запланировано'}
            </Badge>
          </div>
          
          <div className="flex items-center text-honor-darkGray text-sm mb-4">
            <MapPin size={16} className="mr-1" />
            <span>{task.address}</span>
            <span className="mx-2">•</span>
            <Calendar size={16} className="mr-1" />
            <span>До {new Date(task.date).toLocaleDateString('ru-RU')}</span>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1 text-honor-darkGray">
                <ThumbsUp size={18} />
                <span>{task.likes}</span>
              </div>
              <div className="flex items-center space-x-1 text-honor-darkGray">
                <MessageSquare size={18} />
                <span>{task.comments}</span>
              </div>
            </div>
            <div className="flex items-center">
              {task.status !== 'completed' && needsEscalation(task.lastResponseDays) && (
                <Button 
                  variant="ghost" 
                  className="text-amber-600 flex items-center mr-2 hover:bg-amber-50"
                  onClick={() => setEscalatingTask({ id: task.id, title: task.title })}
                >
                  <AlertTriangle size={16} className="mr-1" />
                  Эскалировать
                </Button>
              )}
              <span className="text-sm text-honor-darkGray">
                <Clock size={16} className="inline mr-1" />
                Создано {new Date(task.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        </Card>
      ))}
      
      {mockTasks.length === 0 && (
        <div className="text-center py-10">
          <p className="text-honor-darkGray mb-4">У вас пока нет заданий</p>
          <Link to="/tasks/create">
            <Button className="honor-button-primary">
              Создать первое задание
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TasksTab;
