import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StaffRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Verificar se o usuário está autenticado e é staff
  if (!user || !user.is_staff) {
    return <Navigate to="/equipamentos" replace />;
  }

  return children;
};

export default StaffRoute; 