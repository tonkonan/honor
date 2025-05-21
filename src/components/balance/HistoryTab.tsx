
import React from 'react';
import { Card } from '@/components/ui/card';
import { Wallet, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
}

interface HistoryTabProps {
  transactions: Transaction[];
}

const HistoryTab: React.FC<HistoryTabProps> = ({ transactions }) => {
  return (
    <Card className="honor-card mb-6">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">История транзакций</h2>
        
        <div className="flex justify-between mb-6">
          <div className="text-center">
            <p className="text-sm text-honor-darkGray">Всего получено</p>
            <p className="text-xl font-bold text-honor-blue">
              {transactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0)} 
              билетов
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-honor-darkGray">Всего потрачено</p>
            <p className="text-xl font-bold text-honor-darkGray">
              {Math.abs(transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0))} 
              билетов
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' 
                    ? <ArrowUp size={18} className="text-green-600" /> 
                    : <ArrowDown size={18} className="text-red-600" />
                  }
                </div>
                <div className="ml-4">
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-honor-darkGray">
                    {new Date(transaction.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge className={
                  transaction.type === 'income' 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-red-100 text-red-800 border-red-200'
                }>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} билетов
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {transactions.length === 0 && (
          <div className="text-center py-10">
            <Wallet size={48} className="mx-auto text-honor-darkGray opacity-30 mb-4" />
            <p className="text-honor-darkGray">У вас пока нет транзакций</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default HistoryTab;
