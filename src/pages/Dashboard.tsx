
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UserProfileSidebar,
  TasksTab,
  NotificationsTab,
  SubscriptionsTab
} from '@/components/dashboard';

const Dashboard = () => {
  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User profile sidebar */}
          <div className="lg:col-span-1">
            <UserProfileSidebar />
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="tasks">
              <TabsList className="mb-6 bg-honor-gray">
                <TabsTrigger value="tasks" className="flex-1">Мои задания</TabsTrigger>
                <TabsTrigger value="notifications" className="flex-1">Уведомления</TabsTrigger>
                <TabsTrigger value="subscriptions" className="flex-1">Подписки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks">
                <TasksTab />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
              
              <TabsContent value="subscriptions">
                <SubscriptionsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
