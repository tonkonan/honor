
import React from 'react';
import { MapPin } from 'lucide-react';

interface DistrictsListProps {
  districts: any[];
  selectedDistrict: number | null;
  onSelectDistrict: (id: number) => void;
}

const DistrictsList = ({ districts, selectedDistrict, onSelectDistrict }: DistrictsListProps) => {
  return (
    <div className="honor-card">
      <h2 className="text-xl font-bold mb-4">Избирательные округа</h2>
      <p className="text-honor-darkGray mb-6">
        Выберите округ на карте или из списка для получения подробной информации
      </p>
      
      <div className="space-y-2">
        {districts.map(district => (
          <button
            key={district.id}
            className={`w-full flex items-center justify-between p-3 border rounded-xl transition-colors ${
              selectedDistrict === district.id 
                ? 'bg-honor-blue text-white' 
                : 'hover:bg-honor-gray'
            }`}
            onClick={() => onSelectDistrict(district.id)}
          >
            <div className="flex items-center">
              <MapPin className={selectedDistrict === district.id ? 'text-white' : 'text-honor-blue'} size={20} />
              <span className="ml-2">{district.name}</span>
            </div>
            <span className={`text-sm ${selectedDistrict === district.id ? 'text-white' : 'text-honor-darkGray'}`}>
              {district.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistrictsList;
