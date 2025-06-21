import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import StaffRoute from './components/StaffRoute';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import Perfil from './components/Perfil';
import Equipamentos from './components/Equipamentos';
import CadastrarEquipamento from './components/CadastrarEquipamento';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/perfil" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } />
            
            <Route path="/equipamentos" element={
              <ProtectedRoute>
                <Equipamentos />
              </ProtectedRoute>
            } />
            
            <Route path="/equipamentos/cadastrar" element={
              <ProtectedRoute>
                <StaffRoute>
                  <CadastrarEquipamento />
                </StaffRoute>
              </ProtectedRoute>
            } />
            
            {/* Rota padrão - redireciona para dashboard se autenticado, senão para login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Rota 404 - redireciona para dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

