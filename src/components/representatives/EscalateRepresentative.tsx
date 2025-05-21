
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface EscalateRepresentativeProps {
  representativeId?: string;
  representativeName?: string;
  onCancel: () => void;
}

const EscalateRepresentative = ({ 
  representativeId, 
  representativeName, 
  onCancel 
}: EscalateRepresentativeProps) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Эскалация успешно отправлена', {
        description: 'Ваше обращение будет рассмотрено в ближайшее время'
      });
      setIsSubmitting(false);
      onCancel();
    }, 1000);
  };

  return (
    <div className="honor-card p-6">
      <div className="flex items-center mb-4 text-amber-600">
        <AlertTriangle className="mr-2" size={24} />
        <h2 className="text-xl font-bold">Эскалация представителя</h2>
      </div>
      
      {representativeName && (
        <p className="mb-4 text-honor-darkGray">
          Представитель: <span className="font-medium text-honor-text">{representativeName}</span>
        </p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="reason" className="block mb-2">Причина эскалации</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Укажите причину эскалации представителя власти..."
            className="honor-input min-h-[120px]"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button 
            type="submit" 
            className="honor-button-primary" 
            disabled={!reason.trim() || isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить эскалацию'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EscalateRepresentative;
