
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ProfileSidebar,
  TasksTab,
  MessagesTab
} from '@/components/representative';
import BlogTab from '@/components/representative/BlogTab';

const RepresentativeDashboard = () => {
  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="tasks">
              <TabsList className="mb-6 bg-honor-gray">
                <TabsTrigger value="tasks" className="flex-1">Задачи</TabsTrigger>
                <TabsTrigger value="messages" className="flex-1">Сообщения</TabsTrigger>
                <TabsTrigger value="blog" className="flex-1">Блог</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks">
                <TasksTab />
              </TabsContent>
              
              <TabsContent value="messages">
                <MessagesTab />
              </TabsContent>
              
              <TabsContent value="blog">
                <BlogTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RepresentativeDashboard;
