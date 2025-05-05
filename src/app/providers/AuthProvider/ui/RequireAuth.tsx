import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from 'shared/api/authApi';

interface RequireAuthProps {
  children: ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Сохраняем путь, чтобы вернуться после авторизации
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth; 