
import React from 'react';
import Layout from '@/components/layout/Layout';
import { TasksTab } from '@/components/representative';

const RepresentativeTasks = () => {
  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Управление задачами</h1>
          <TasksTab />
        </div>
      </div>
    </Layout>
  );
};

export default RepresentativeTasks;
