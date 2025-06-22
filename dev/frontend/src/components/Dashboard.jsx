import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { equipamentoService } from '../lib/api';
import Layout from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Users, 
  TrendingUp, 
  Calendar,
  Search,
  Plus,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [equipamentos, setEquipamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEquipamentos: 0,
    equipamentosDisponiveis: 0,
    categorias: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Carregar equipamentos em paralelo
      const [equipamentosResponse, categoriasResponse, disponiveisResponse] = await Promise.all([
        equipamentoService.listar({ page_size: 6 }),
        equipamentoService.listarCategorias(),
        equipamentoService.listarDisponiveis(),
      ]);

      setEquipamentos(equipamentosResponse.results || equipamentosResponse.equipamentos || []);
      setCategorias(categoriasResponse);
      
      // Calcular estatísticas
      setStats({
        totalEquipamentos: equipamentosResponse.count || equipamentosResponse.equipamentos?.length || 0,
        equipamentosDisponiveis: disponiveisResponse.count || disponiveisResponse.equipamentos?.length || 0,
        categorias: categoriasResponse.length || 0,
      });

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (estado) => {
    const statusMap = {
      disponivel: { label: 'Disponível', variant: 'default' },
      locado: { label: 'Locado', variant: 'secondary' },
      manutencao: { label: 'Manutenção', variant: 'destructive' },
      inativo: { label: 'Inativo', variant: 'outline' },
    };
    
    const status = statusMap[estado] || { label: estado, variant: 'outline' };
    return <Badge variant={status.variant}>{status.label}</Badge>;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bem-vindo, {user?.nome_completo?.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie seus equipamentos e locações
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/equipamentos">
                <Search className="h-4 w-4 mr-2" />
                Ver Equipamentos
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Equipamentos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEquipamentos}</div>
              <p className="text-xs text-muted-foreground">
                Equipamentos cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Disponíveis
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.equipamentosDisponiveis}
              </div>
              <p className="text-xs text-muted-foreground">
                Prontos para locação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categorias
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categorias}</div>
              <p className="text-xs text-muted-foreground">
                Tipos de equipamentos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Equipment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Equipamentos Recentes
                <Button variant="outline" size="sm" asChild>
                  <Link to="/equipamentos">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Todos
                  </Link>
                </Button>
              </CardTitle>
              <CardDescription>
                Últimos equipamentos cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipamentos.length > 0 ? (
                  equipamentos.slice(0, 5).map((equipamento) => (
                    <div
                      key={equipamento.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {equipamento.imagem_principal ? (
                          <img
                            src={equipamento.imagem_principal}
                            alt={equipamento.nome}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-sm">{equipamento.nome}</h4>
                          <p className="text-xs text-gray-500">
                            {equipamento.marca} {equipamento.modelo}
                          </p>
                          <p className="text-xs font-medium text-green-600">
                            {formatCurrency(equipamento.valor_diaria)}/dia
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(equipamento.estado)}
                        <p className="text-xs text-gray-500 mt-1">
                          Qtd: {equipamento.quantidade_disponivel}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhum equipamento encontrado</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorias de Equipamentos</CardTitle>
              <CardDescription>
                Tipos de equipamentos disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categorias.length > 0 ? (
                  categorias.map((categoria) => (
                    <div
                      key={categoria.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-sm">{categoria.nome}</h4>
                        {categoria.descricao && (
                          <p className="text-xs text-gray-500 mt-1">
                            {categoria.descricao}
                          </p>
                        )}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/equipamentos?categoria=${categoria.id}`}>
                          Ver
                        </Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhuma categoria encontrada</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/equipamentos">
                  <Search className="h-6 w-6 mb-2" />
                  Buscar Equipamentos
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/perfil">
                  <Users className="h-6 w-6 mb-2" />
                  Meu Perfil
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/equipamentos?disponivel=true">
                  <Package className="h-6 w-6 mb-2" />
                  Disponíveis
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/configuracoes">
                  <Calendar className="h-6 w-6 mb-2" />
                  Configurações
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;

