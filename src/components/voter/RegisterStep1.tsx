
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Phone, User } from 'lucide-react';

interface RegisterStep1Props {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    district: string;
    address: string;
    useAddress: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const RegisterStep1 = ({ formData, handleChange, handleSubmit }: RegisterStep1Props) => {
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

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <input
            id="useAddress"
            name="useAddress"
            type="checkbox"
            checked={formData.useAddress}
            onChange={handleChange}
            className="h-4 w-4 text-honor-blue border-gray-300 rounded focus:ring-honor-blue"
          />
          <label htmlFor="useAddress" className="ml-2 block text-sm">
            Указать адрес вместо избирательного участка
          </label>
        </div>

        {formData.useAddress ? (
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="honor-input pl-10"
              placeholder="Город, улица, дом"
              required={formData.useAddress}
            />
            <p className="text-xs text-honor-darkGray mt-1">
              Система автоматически определит ваш избирательный участок
            </p>
          </div>
        ) : (
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
            <Input
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="honor-input pl-10"
              placeholder="Номер избирательного участка"
              required={!formData.useAddress}
            />
          </div>
        )}
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

export default RegisterStep1;
