
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// Mock data for analytics
const districtActivity = [
  { name: 'Округ 1', задачи: 30, активность: 65, решено: 18 },
  { name: 'Округ 2', задачи: 25, активность: 59, решено: 20 },
  { name: 'Округ 3', задачи: 40, активность: 80, решено: 28 },
  { name: 'Округ 4', задачи: 27, активность: 43, решено: 15 },
  { name: 'Округ 5', задачи: 18, активность: 34, решено: 12 },
];

const taskDistribution = [
  { name: 'Инфраструктура', value: 35 },
  { name: 'ЖКХ', value: 25 },
  { name: 'Образование', value: 15 },
  { name: 'Благоустройство', value: 20 },
  { name: 'Другое', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  return (
    <Layout>
      <div className="honor-container py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Аналитика платформы</h1>
          <p className="text-honor-darkGray mb-8">Детальная аналитика и статистика по работе платформы</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center">
              <h3 className="text-honor-darkGray mb-2">Всего представителей</h3>
              <p className="text-4xl font-bold text-honor-blue">47</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-honor-darkGray mb-2">Всего избирателей</h3>
              <p className="text-4xl font-bold text-honor-blue">1,245</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-honor-darkGray mb-2">Созданных задач</h3>
              <p className="text-4xl font-bold text-honor-blue">328</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-honor-darkGray mb-2">Решенных задач</h3>
              <p className="text-4xl font-bold text-green-600">215</p>
            </Card>
          </div>
          
          <Tabs defaultValue="districts">
            <TabsList className="mb-6 bg-honor-gray">
              <TabsTrigger value="districts" className="flex-1">По округам</TabsTrigger>
              <TabsTrigger value="tasks" className="flex-1">По задачам</TabsTrigger>
              <TabsTrigger value="engagement" className="flex-1">Активность</TabsTrigger>
            </TabsList>
            
            <TabsContent value="districts">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Активность по округам</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={districtActivity}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="задачи" fill="#3b82f6" />
                      <Bar dataKey="активность" fill="#8884d8" />
                      <Bar dataKey="решено" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Распределение задач по категориям</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {taskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Статус задач</h2>
                  <div className="space-y-4 mt-8">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Решено</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>В процессе</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Запланировано</span>
                        <span>10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="engagement">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Активность пользователей по месяцам</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Янв', активность: 45 },
                        { month: 'Фев', активность: 52 },
                        { month: 'Мар', активность: 61 },
                        { month: 'Апр', активность: 67 },
                        { month: 'Май', активность: 90 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="активность" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
