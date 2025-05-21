
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, HelpCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  code: string | number;
  title: string;
  message: string;
  additionalInfo?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showHelpButton?: boolean;
  children?: React.ReactNode;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code,
  title,
  message,
  additionalInfo,
  showBackButton = true,
  showHomeButton = true,
  showHelpButton = true,
  children
}) => {
  return (
    <Layout>
      <div className="honor-container py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-honor-blue/10 rounded-full flex items-center justify-center animate-pulse"></div>
                <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-honor-blue">{code}</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mt-6 mb-4">{title}</h2>
            <p className="text-honor-darkGray mb-6">
              {message}
            </p>
            
            {additionalInfo && (
              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-700 text-sm">
                  {additionalInfo}
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="space-y-4">
            {showHomeButton && (
              <Link to="/">
                <Button className="flex items-center bg-honor-blue hover:bg-honor-darkBlue text-white w-full">
                  <Home size={18} className="mr-2" />
                  Вернуться на главную
                </Button>
              </Link>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              {showHelpButton && (
                <Link to="/help">
                  <Button variant="outline" className="flex items-center w-full">
                    <HelpCircle size={18} className="mr-2" />
                    Перейти в раздел помощи
                  </Button>
                </Link>
              )}
              
              {showBackButton && (
                <Button 
                  variant="ghost" 
                  className="flex items-center w-full text-honor-darkGray"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Вернуться назад
                </Button>
              )}
            </div>
          </div>
          
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
