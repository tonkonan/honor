
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MapFiltersProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRepresentativeTypeChange: (value: string) => void;
  onSortByChange: (value: string) => void;
}

const MapFilters = ({ searchTerm, onSearchChange, onRepresentativeTypeChange, onSortByChange }: MapFiltersProps) => {
  return (
    <div className="relative mb-8">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-honor-darkGray" size={18} />
          <Input
            className="honor-input pl-10"
            placeholder="Поиск округа или представителя власти"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={(value) => onRepresentativeTypeChange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Тип представителя" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="депутат">Депутаты</SelectItem>
              <SelectItem value="чиновник">Чиновники</SelectItem>
              <SelectItem value="муниципальный служащий">Муниципальные служащие</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onSortByChange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Сортировать по" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Без сортировки</SelectItem>
              <SelectItem value="rating">По рейтингу</SelectItem>
              <SelectItem value="tasks">По выполненным задачам</SelectItem>
              <SelectItem value="attendance">По посещаемости</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
