import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, MapPin, Plus, LogIn, Bell, Ticket, LogOut } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogTrigger 
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  // Получаем данные о пользователе из контекста
  const { user, logout } = useAuth();
  
  // Mock ticket count - in a real app, this would come from user state
  const ticketCount = 35;

  return (
    <header className="bg-white shadow-sm">
      <div className="honor-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-honor-blue whitespace-nowrap">Честь</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/tasks/create" className="flex items-center space-x-1 text-honor-text hover:text-honor-blue transition-colors">
              <Plus size={20} />
              <span>Создать задание</span>
            </Link>
            <Link to="/map" className="flex items-center space-x-1 text-honor-text hover:text-honor-blue transition-colors">
              <MapPin size={20} />
              <span>Карта округов</span>
            </Link>
            <Link to="/representatives" className="flex items-center space-x-1 text-honor-text hover:text-honor-blue transition-colors">
              <User size={20} />
              <span>Представители</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <button className="relative p-2 text-honor-text hover:text-honor-blue transition-colors">
                  <Bell size={24} />
                  <span className="absolute top-0 right-0 bg-honor-blue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Уведомления</DialogTitle>
                  <DialogDescription>
                    Здесь отображаются уведомления и события, связанные с вашими подписками
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Вы подписаны на следующие округа:</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center p-2 bg-honor-gray rounded">
                          <div className="flex items-center">
                            <MapPin size={16} className="text-honor-blue mr-2" />
                            <span>Округ №3</span>
                          </div>
                          <Button variant="ghost" size="sm">Отписаться</Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Последние уведомления:</h3>
                      <div className="mt-2 space-y-2">
                        <div className="p-2 bg-honor-gray rounded">
                          <p className="text-sm font-medium">Новое задание в Округе №3</p>
                          <p className="text-xs text-honor-darkGray">15 минут назад</p>
                        </div>
                        <div className="p-2 bg-honor-gray rounded">
                          <p className="text-sm font-medium">Встреча с жителями перенесена</p>
                          <p className="text-xs text-honor-darkGray">2 часа назад</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="honor-button-secondary flex items-center space-x-2">
                    <User size={18} />
                    <span className="max-w-[150px] truncate">{user.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full cursor-pointer">
                      Личный кабинет
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      Профиль
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                    <LogOut size={16} className="mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="honor-button-primary flex items-center space-x-1">
                  <LogIn size={18} />
                  <span>Логин</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
