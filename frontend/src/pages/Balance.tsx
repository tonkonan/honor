
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  BalanceSummary, 
  PurchaseTab, 
  HistoryTab, 
  UsageTab 
} from '@/components/balance';
import { mockTransactions } from '@/data/mockTransactions';

const Balance = () => {
  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState('https://honor-platform.ru/ref/user123');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const currentBalance = mockTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const handleShareReferral = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Ссылка скопирована",
      description: "Реферальная ссылка скопирована в буфер обмена",
      variant: "default",
    });
  };

  const handlePurchase = () => {
    if (!selectedAmount) return;
    
    toast({
      title: "Переход к оплате",
      description: `Оплата ${selectedAmount} билетов на сумму ${selectedAmount * 10} руб.`,
      variant: "default",
    });
  };

  const handleWatchAd = () => {
    toast({
      title: "Реклама",
      description: "После просмотра рекламы вы получите 1 билет",
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="honor-container py-12">
        <h1 className="text-3xl font-bold mb-8">Баланс билетов</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance summary */}
          <div className="lg:col-span-1">
            <BalanceSummary 
              currentBalance={currentBalance}
              referralLink={referralLink}
              handleShareReferral={handleShareReferral}
              handleWatchAd={handleWatchAd}
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="purchase">
              <TabsList className="mb-6 bg-honor-gray">
                <TabsTrigger value="purchase" className="flex-1">Пополнение</TabsTrigger>
                <TabsTrigger value="history" className="flex-1">История</TabsTrigger>
                <TabsTrigger value="usage" className="flex-1">Расходы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="purchase">
                <PurchaseTab 
                  selectedAmount={selectedAmount}
                  setSelectedAmount={setSelectedAmount}
                  handlePurchase={handlePurchase}
                />
              </TabsContent>
              
              <TabsContent value="history">
                <HistoryTab transactions={mockTransactions} />
              </TabsContent>
              
              <TabsContent value="usage">
                <UsageTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Balance;
