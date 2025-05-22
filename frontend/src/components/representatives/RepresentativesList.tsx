
import React from 'react';
import RepresentativeCard from './RepresentativeCard';

interface Representative {
  id: number;
  name: string;
  role: string;
  district: string;
  party: string;
  tasksTotal: number;
  tasksCompleted: number;
  rating: number;
}

interface RepresentativesListProps {
  representatives: Representative[];
}

const RepresentativesList = ({ representatives }: RepresentativesListProps) => {
  if (representatives.length === 0) {
    return (
      <div className="honor-card text-center py-8">
        <p className="text-honor-darkGray">По вашему запросу ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {representatives.map(rep => (
        <RepresentativeCard key={rep.id} representative={rep} />
      ))}
    </div>
  );
};

export default RepresentativesList;
