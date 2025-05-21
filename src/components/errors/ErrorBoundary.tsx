
import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from './ErrorPage';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <ErrorPage
          code="500"
          title="Что-то пошло не так"
          message="Произошла непредвиденная ошибка при загрузке страницы."
          additionalInfo="Мы уже работаем над устранением проблемы. Попробуйте обновить страницу или вернуться назад."
        >
          <div className="mt-8 text-sm text-honor-darkGray p-4 bg-gray-50 rounded-lg">
            <p>Возможные решения:</p>
            <ul className="mt-2 space-y-1 text-left">
              <li className="hover:text-honor-blue">
                <button onClick={() => window.location.reload()} className="w-full text-left block p-2 hover:bg-gray-100 rounded">
                  → Обновить страницу
                </button>
              </li>
              <li className="hover:text-honor-blue">
                <Link to="/login" className="block p-2 hover:bg-gray-100 rounded">
                  → Выйти и войти снова
                </Link>
              </li>
              <li className="hover:text-honor-blue">
                <Link to="/help" className="block p-2 hover:bg-gray-100 rounded">
                  → Обратиться в службу поддержки
                </Link>
              </li>
            </ul>
          </div>
        </ErrorPage>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
