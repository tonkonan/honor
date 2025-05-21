
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone } from 'lucide-react';

interface RepresentativeStep1Props {
  formData: {
    fullName: string;
    phone: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const RepresentativeStep1 = ({ formData, handleChange, handleSubmit }: RepresentativeStep1Props) => {
  return (
    <form onSubmit={handleSubmit} className="honor-card">
      <div className="mb-6">
        <Label htmlFor="fullName" className="block mb-2">ФИО</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="honor-input pl-10"
            placeholder="Иванов Иван Иванович"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="phone" className="block mb-2">Номер телефона</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="honor-input pl-10"
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="email" className="block mb-2">Электронная почта</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="honor-input pl-10"
            placeholder="example@mail.ru"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full honor-button-primary">
        Продолжить
      </Button>

      <div className="mt-4 text-xs text-honor-darkGray text-center">
        Нажимая "Продолжить", вы соглашаетесь с правилами использования платформы и даете согласие на обработку персональных данных
      </div>
    </form>
  );
};

export default RepresentativeStep1;
