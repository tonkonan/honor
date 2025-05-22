
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { 
  User, 
  Search, 
  Send, 
  Clock,
  Plus,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    representative: {
      id: 1,
      name: "Иванов Иван Иванович",
      role: "Депутат городской думы",
      avatar: null
    },
    lastMessage: "Спасибо за ваше обращение, я обязательно рассмотрю этот вопрос",
    lastMessageDate: "2025-05-04",
    unread: true
  },
  {
    id: 2,
    representative: {
      id: 2,
      name: "Петров Петр Петрович",
      role: "Глава администрации",
      avatar: null
    },
    lastMessage: "Мы запланировали ремонт дороги на следующий месяц",
    lastMessageDate: "2025-05-02",
    unread: false
  }
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: 1,
    senderId: "user",
    text: "Здравствуйте! Хотел обратить ваше внимание на проблему с дорожным покрытием на улице Ленина.",
    timestamp: "2025-05-03T10:30:00"
  },
  {
    id: 2,
    senderId: "representative",
    text: "Добрый день! Спасибо за ваше обращение. Я в курсе этой проблемы, мы уже включили эту улицу в план ремонта на следующий месяц.",
    timestamp: "2025-05-03T11:15:00"
  },
  {
    id: 3,
    senderId: "user",
    text: "Спасибо за оперативный ответ! Буду следить за продвижением работ.",
    timestamp: "2025-05-03T11:20:00"
  },
  {
    id: 4,
    senderId: "representative",
    text: "Спасибо за ваше обращение, я обязательно рассмотрю этот вопрос и дам вам знать о результатах.",
    timestamp: "2025-05-04T09:45:00"
  }
];

const MessageCenter = () => {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conversation => 
    conversation.representative.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to the backend
    toast({
      title: "Требуется оплата",
      description: "Для отправки сообщения требуется 10 билетов",
      variant: "default",
    });
    
    setMessageText('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  };

  const handleNewConversation = () => {
    toast({
      title: "Новое сообщение",
      description: "Выберите представителя из списка",
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="honor-container py-12">
        <h1 className="text-3xl font-bold mb-8">Центр сообщений</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with conversations */}
          <div className="lg:col-span-1">
            <Card className="honor-card h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
                  <Input
                    className="pl-10 pr-4 py-2"
                    placeholder="Поиск сообщений"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full honor-button-primary flex items-center justify-center"
                  onClick={handleNewConversation}
                >
                  <Plus size={18} className="mr-2" />
                  Новое сообщение
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map(conversation => (
                  <button
                    key={conversation.id}
                    className={`w-full flex items-start p-4 transition-colors border-b ${
                      selectedConversation?.id === conversation.id 
                        ? 'bg-honor-blue/10' 
                        : 'hover:bg-honor-gray'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <Avatar className="h-12 w-12 mr-4">
                      <User size={24} />
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">
                          {conversation.representative.name}
                          {conversation.unread && (
                            <span className="ml-2 inline-block w-2 h-2 bg-honor-blue rounded-full"></span>
                          )}
                        </h3>
                        <span className="text-xs text-honor-darkGray">
                          {new Date(conversation.lastMessageDate).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      <p className="text-xs text-honor-darkGray mt-1">{conversation.representative.role}</p>
                      <p className="text-sm text-honor-darkGray mt-1 truncate">{conversation.lastMessage}</p>
                    </div>
                  </button>
                ))}
                
                {filteredConversations.length === 0 && (
                  <div className="p-4 text-center text-honor-darkGray">
                    Нет сообщений
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Chat window */}
          <div className="lg:col-span-2">
            <Card className="honor-card h-[600px] flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat header */}
                  <div className="p-4 border-b flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <User size={20} />
                    </Avatar>
                    <div>
                      <h2 className="font-bold">{selectedConversation.representative.name}</h2>
                      <p className="text-xs text-honor-darkGray">{selectedConversation.representative.role}</p>
                    </div>
                  </div>
                  
                  {/* Chat messages */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    {/* Group messages by date */}
                    {mockMessages.map((message, index) => {
                      // Check if we need to show a date separator
                      const showDateHeader = index === 0 || 
                        formatDate(message.timestamp) !== formatDate(mockMessages[index - 1].timestamp);
                      
                      return (
                        <React.Fragment key={message.id}>
                          {showDateHeader && (
                            <div className="text-center my-4">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-honor-darkGray">
                                {formatDate(message.timestamp)}
                              </span>
                            </div>
                          )}
                          
                          <div className={`flex mb-4 ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {message.senderId === 'representative' && (
                              <Avatar className="h-8 w-8 mr-2 mt-1">
                                <User size={16} />
                              </Avatar>
                            )}
                            
                            <div className={`max-w-[70%] ${
                              message.senderId === 'user' 
                                ? 'bg-honor-blue text-white rounded-tl-xl rounded-bl-xl rounded-tr-xl' 
                                : 'bg-gray-100 text-honor-darkGray rounded-tr-xl rounded-br-xl rounded-tl-xl'
                            } px-4 py-2`}>
                              <p>{message.text}</p>
                              <div className={`text-right text-xs mt-1 ${
                                message.senderId === 'user' ? 'text-white/70' : 'text-honor-darkGray'
                              }`}>
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center">
                      <Textarea
                        className="flex-1 resize-none honor-input"
                        placeholder="Введите сообщение..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={2}
                      />
                      <Button 
                        className="ml-3 honor-button-primary rounded-full h-10 w-10 flex items-center justify-center p-0"
                        onClick={handleSendMessage}
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                    <div className="text-xs text-honor-darkGray mt-2 flex items-center">
                      <Clock size={12} className="mr-1" />
                      Стоимость отправки: 10 билетов
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="mx-auto mb-4 text-honor-blue" size={48} />
                    <h2 className="text-xl font-bold mb-2">Выберите диалог</h2>
                    <p className="text-honor-darkGray mb-4">
                      Выберите диалог из списка слева или начните новый разговор
                    </p>
                    <Button 
                      className="honor-button-primary"
                      onClick={handleNewConversation}
                    >
                      Начать новый диалог
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessageCenter;
