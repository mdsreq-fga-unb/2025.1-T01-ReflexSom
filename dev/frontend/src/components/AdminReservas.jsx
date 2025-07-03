import React, { useState, useEffect } from 'react';
import { adminReservaService } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar, 
  Package, 
  DollarSign
} from 'lucide-react';

const AdminReservas = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('AdminReservas mounted, user:', user);
    if (user?.is_staff) {
      carregarReservas();
    }
  }, [user]);

  const carregarReservas = async () => {
    try {
      console.log('Carregando reservas...');
      setLoading(true);
      setError('');
      
      const response = await adminReservaService.listarTodasReservas();
      console.log('Reservas carregadas:', response);
      
      setReservas(response || []);
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
      setError(`Erro ao carregar reservas: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAprovarReserva = async (reservaId) => {
    try {
      console.log('Aprovando reserva:', reservaId);
      await adminReservaService.aprovarReserva(reservaId);
      carregarReservas();
    } catch (error) {
      console.error('Erro ao aprovar reserva:', error);
      setError(`Erro ao aprovar reserva: ${error.message}`);
    }
  };

  const handleRejeitarReserva = async (reservaId) => {
    try {
      console.log('Rejeitando reserva:', reservaId);
      await adminReservaService.rejeitarReserva(reservaId, 'Rejeitada pelo administrador');
      carregarReservas();
    } catch (error) {
      console.error('Erro ao rejeitar reserva:', error);
      setError(`Erro ao rejeitar reserva: ${error.message}`);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pendente': { variant: 'secondary', icon: Clock, label: 'Pendente' },
      'aprovada': { variant: 'default', icon: CheckCircle, label: 'Aprovada' },
      'rejeitada': { variant: 'destructive', icon: XCircle, label: 'Rejeitada' },
      'cancelada': { variant: 'outline', icon: XCircle, label: 'Cancelada' }
    };

    const config = statusConfig[status] || statusConfig.pendente;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  console.log('Renderizando AdminReservas', { user, loading, error, reservas });

  if (!user?.is_staff) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert>
            <AlertDescription>
              Acesso negado. Apenas administradores podem acessar esta página.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administração de Reservas
          </h1>
          <p className="text-gray-600">
            Gerencie as solicitações de reserva dos clientes
          </p>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          {reservas.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma reserva encontrada</p>
                <Button onClick={carregarReservas} className="mt-4">
                  Recarregar
                </Button>
              </CardContent>
            </Card>
          ) : (
            reservas.map((reserva) => (
              <Card key={reserva.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Reserva #{reserva.id}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {reserva.cliente?.nome_completo || 'Cliente não identificado'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatarData(reserva.data_solicitacao)}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {formatarValor(reserva.valor_total)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(reserva.status)}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p><strong>Data de Uso:</strong> {new Date(reserva.data_uso).toLocaleDateString('pt-BR')}</p>
                    {reserva.observacoes && (
                      <p><strong>Observações:</strong> {reserva.observacoes}</p>
                    )}
                  </div>

                  <div className="flex gap-2 mb-4">
                    <span className="text-sm font-medium">Itens:</span>
                    <div className="flex flex-wrap gap-1">
                      {reserva.itens?.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item.equipamento_nome || 'Item'} (x{item.quantidade})
                        </Badge>
                      )) || <span className="text-xs text-gray-500">Nenhum item</span>}
                    </div>
                  </div>

                  {reserva.status === 'pendente' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAprovarReserva(reserva.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprovar
                      </Button>
                      
                      <Button
                        onClick={() => handleRejeitarReserva(reserva.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejeitar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminReservas; 