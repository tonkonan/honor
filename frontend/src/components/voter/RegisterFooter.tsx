
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterFooter = () => {
  return (
    <div className="mt-8 text-center">
      <p className="text-honor-darkGray">
        Уже зарегистрированы?{' '}
        <Link to="/login" className="text-honor-blue hover:underline">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterFooter;
