
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, Plus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TaskCreate = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    solution: '',
    endDate: '',
  });
  const [stages, setStages] = useState([{ title: '', date: '' }]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStageChange = (index: number, field: string, value: string) => {
    const updatedStages = [...stages];
    updatedStages[index] = { ...updatedStages[index], [field]: value };
    setStages(updatedStages);
  };

  const addStage = () => {
    setStages([...stages, { title: '', date: '' }]);
  };

  const removeStage = (index: number) => {
    if (stages.length > 1) {
      const updatedStages = [...stages];
      updatedStages.splice(index, 1);
      setStages(updatedStages);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send data to the backend
    
    toast({
      title: "Требуется оплата",
      description: "Для создания задания требуется 10 билетов",
      variant: "default",
    });
    
    // Here would be code to handle payment and submission
  };

  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Создание задания</h1>

          <form onSubmit={handleSubmit} className="honor-card">
            <div className="mb-6">
              <Label htmlFor="title" className="block mb-2">Заголовок задания</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="honor-input"
                placeholder="Например: Ремонт дороги на ул. Ленина"
                required
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="address" className="block mb-2">Адрес</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="honor-input pl-10"
                  placeholder="Укажите точный адрес проблемы"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="description" className="block mb-2">Описание проблемы</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="honor-input min-h-[100px]"
                placeholder="Подробно опишите суть проблемы..."
                required
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="solution" className="block mb-2">Возможные пути решения</Label>
              <Textarea
                id="solution"
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                className="honor-input"
                placeholder="Опишите возможные варианты решения проблемы..."
                required
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="endDate" className="block mb-2">Желаемая дата решения</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="honor-input pl-10"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <Label>Этапы решения</Label>
                <Button 
                  type="button" 
                  onClick={addStage} 
                  variant="outline" 
                  size="sm"
                  className="flex items-center text-honor-blue"
                >
                  <Plus size={16} className="mr-1" />
                  Добавить этап
                </Button>
              </div>
              
              {stages.map((stage, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <Input
                      value={stage.title}
                      onChange={(e) => handleStageChange(index, 'title', e.target.value)}
                      className="honor-input"
                      placeholder="Название этапа"
                      required
                    />
                  </div>
                  <div className="w-40">
                    <Input
                      type="date"
                      value={stage.date}
                      onChange={(e) => handleStageChange(index, 'date', e.target.value)}
                      className="honor-input"
                      required
                    />
                  </div>
                  {stages.length > 1 && (
                    <Button 
                      type="button" 
                      onClick={() => removeStage(index)} 
                      variant="ghost" 
                      size="icon"
                      className="text-honor-darkGray hover:text-red-500"
                    >
                      <X size={18} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <Label className="block mb-2">Приложенные файлы</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <p className="text-honor-darkGray mb-2">
                  Перетащите файлы сюда или нажмите для выбора
                </p>
                <Button type="button" variant="outline" className="text-honor-blue">
                  Выбрать файлы
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full honor-button-primary">
              Создать задание (10 билетов)
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TaskCreate;
