import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import StaffRoute from './components/StaffRoute';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import Perfil from './components/Perfil';
import Equipamentos from './components/Equipamentos';
import CadastrarEquipamento from './components/CadastrarEquipamento';
import DetalhesEquipamento from './components/DetalhesEquipamento';
import Carrinho from './components/Carrinho';
import AdminReservas from './components/AdminReservas';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
              
              <Route path="/equipamentos/:id" element={
                <ProtectedRoute>
                  <DetalhesEquipamento />
                </ProtectedRoute>
              } />
              
              <Route path="/carrinho" element={
                <ProtectedRoute>
                  <Carrinho />
                </ProtectedRoute>
              } />
              
              {/* Rotas protegidas para staff */}
              <Route path="/equipamentos/cadastrar" element={
                <StaffRoute>
                  <CadastrarEquipamento />
                </StaffRoute>
              } />
              
              <Route path="/admin/reservas" element={
                <StaffRoute>
                  <AdminReservas />
                </StaffRoute>
              } />
              
              {/* Redirecionamento padrão */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

