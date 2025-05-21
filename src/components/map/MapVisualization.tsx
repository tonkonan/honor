
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Plus, AlertTriangle, BarChart, TrendingUp } from 'lucide-react';

interface District {
  id: number;
  name: string;
  description: string;
  stats: {
    tasksCompleted: number;
    tasksTotal: number;
  };
  problems: Array<{
    id: number;
    title: string;
    status: string;
    priority: string;
  }>;
}

interface MapVisualizationProps {
  districts: District[];
  selectedDistrict: number | null;
  showProblems: boolean;
  showStats: boolean;
  onToggleProblems: () => void;
  onToggleStats: () => void;
  onSelectDistrict: (id: number) => void;
}

const MapVisualization = ({
  districts,
  selectedDistrict,
  showProblems,
  showStats,
  onToggleProblems,
  onToggleStats,
  onSelectDistrict,
}: MapVisualizationProps) => {
  const selectedDistrictData = districts.find(d => d.id === selectedDistrict);

  return (
    <div className="honor-card relative min-h-[500px] flex items-center justify-center">
      <div className="text-honor-darkGray text-center">
        <MapPin size={48} className="mx-auto mb-4 text-honor-blue" />
        <p>Интерактивная карта округов</p>
        <p className="text-sm">(В этом прототипе используется заглушка вместо реальной карты)</p>
      </div>

      {/* Mock district pins on the map */}
      {districts.map((district, index) => (
        <button
          key={district.id}
          className={`absolute rounded-full p-2 transition-all ${
            selectedDistrict === district.id 
              ? 'bg-honor-blue text-white scale-125 z-10' 
              : 'bg-white border border-honor-blue text-honor-blue hover:bg-honor-blue/10'
          }`}
          style={{
            top: `${20 + (index * 15)}%`,
            left: `${15 + (index * 18)}%`,
          }}
          onClick={() => onSelectDistrict(district.id)}
        >
          <MapPin size={24} />
        </button>
      ))}

      {/* Отображение проблем на карте, если включено */}
      {showProblems && selectedDistrictData && selectedDistrictData.problems.map((problem, index) => (
        <div 
          key={problem.id}
          className={`absolute p-2 rounded-lg z-20 ${
            problem.priority === 'высокий' ? 'bg-red-100 text-red-800 border border-red-300' :
            'bg-amber-100 text-amber-800 border border-amber-300'
          }`}
          style={{
            top: `${30 + (index * 10)}%`,
            left: `${30 + (index * 8)}%`,
            maxWidth: '200px'
          }}
        >
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className={problem.priority === 'высокий' ? 'text-red-600' : 'text-amber-600'} />
            <div>
              <p className="text-sm font-medium">{problem.title}</p>
              <p className="text-xs">Статус: {problem.status}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Управление картой */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Link to="/tasks/create">
          <Button className="honor-button-primary flex items-center space-x-2">
            <Plus size={18} />
            <span>Создать задание</span>
          </Button>
        </Link>
        <Button 
          variant="outline" 
          className="bg-white" 
          onClick={onToggleProblems}
        >
          <AlertTriangle size={18} className="mr-2" />
          {showProblems ? 'Скрыть проблемы' : 'Показать проблемы'}
        </Button>
        <Button 
          variant="outline" 
          className="bg-white" 
          onClick={onToggleStats}
        >
          <BarChart size={18} className="mr-2" />
          {showStats ? 'Скрыть статистику' : 'Показать статистику'}
        </Button>
      </div>

      {/* Статистика по округам на карте */}
      {showStats && districts.map((district, index) => (
        <div 
          key={`stat-${district.id}`}
          className="absolute bg-white/90 p-3 rounded-lg border border-honor-blue shadow-sm"
          style={{
            bottom: `${20 + (index * 15)}%`,
            right: `${15 + (index * 8)}%`,
            maxWidth: '180px',
            zIndex: 5
          }}
        >
          <p className="text-sm font-semibold text-honor-blue">{district.name}</p>
          <div className="flex items-center gap-1 text-xs text-honor-darkGray mt-1">
            <TrendingUp size={14} />
            <span>Выполнено: {district.stats.tasksCompleted}/{district.stats.tasksTotal}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div 
              className="bg-honor-blue h-1.5 rounded-full" 
              style={{ width: `${(district.stats.tasksCompleted/district.stats.tasksTotal) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapVisualization;
