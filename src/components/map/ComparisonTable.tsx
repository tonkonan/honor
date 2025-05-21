
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { TrendingUp } from 'lucide-react';

interface ComparisonTableProps {
  representatives: any[];
  onSelectRepresentative: (rep: any) => void;
}

const ComparisonTable = ({ representatives, onSelectRepresentative }: ComparisonTableProps) => {
  if (!representatives || representatives.length <= 1) {
    return null;
  }

  return (
    <div className="mt-8 honor-card">
      <h2 className="text-xl font-bold mb-4">Сравнение представителей округа</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Представитель</TableHead>
              <TableHead>Должность</TableHead>
              <TableHead className="text-center">Тип</TableHead>
              <TableHead className="text-center">Рейтинг</TableHead>
              <TableHead className="text-center">Выполнено задач</TableHead>
              <TableHead className="text-center">Посещаемость</TableHead>
              <TableHead className="text-center">Последняя активность</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {representatives.map(rep => (
              <TableRow key={rep.id} className="cursor-pointer hover:bg-honor-gray" onClick={() => onSelectRepresentative(rep)}>
                <TableCell className="font-medium">{rep.name}</TableCell>
                <TableCell>{rep.position}</TableCell>
                <TableCell className="text-center">{rep.type}</TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center">
                    <span className="text-honor-blue font-medium">{rep.rating}</span>
                    <TrendingUp size={14} className="ml-1 text-honor-blue" />
                  </div>
                </TableCell>
                <TableCell className="text-center">{rep.tasksCompleted}</TableCell>
                <TableCell className="text-center">{rep.attendance}%</TableCell>
                <TableCell className="text-center">{rep.lastActivity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComparisonTable;
