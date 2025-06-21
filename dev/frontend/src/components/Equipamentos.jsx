import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { equipamentoService } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  Search, 
  Filter,
  Eye,
  MapPin,
  Calendar,
  DollarSign,
  Grid,
  List,
  Plus
} from 'lucide-react';

const Equipamentos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [equipamentos, setEquipamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    categoria: searchParams.get('categoria') || '',
    disponivel: searchParams.get('disponivel') || '',
    preco_min: searchParams.get('preco_min') || '',
    preco_max: searchParams.get('preco_max') || '',
    marca: searchParams.get('marca') || '',
  });

  // Verificar se o usuário é staff
  const isStaff = user?.is_staff || false;

  useEffect(() => {
    loadCategorias();
  }, []);

  useEffect(() => {
    loadEquipamentos();
  }, [searchParams]);

  const loadCategorias = async () => {
    try {
      const response = await equipamentoService.listarCategorias();
      setCategorias(Array.isArray(response) ? response : response.results || response.categorias || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const loadEquipamentos = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(searchParams);
      const response = await equipamentoService.listar(params);
      setEquipamentos(response.results || response.equipamentos || []);
    } catch (error) {
      console.error('Erro ao carregar equipamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'search') {
          params.set('q', value);
        } else {
          params.set(key, value);
        }
      }
    });

    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categoria: '',
      disponivel: '',
      preco_min: '',
      preco_max: '',
      marca: '',
    });
    setSearchParams({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const getStatusBadge = (estado, disponivel) => {
    if (disponivel) {
      return <Badge variant="default" className="bg-green-100 text-green-800">Disponível</Badge>;
    }
    
    const statusMap = {
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

  const EquipamentoCard = ({ equipamento }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{equipamento.nome}</CardTitle>
            <CardDescription>
              {equipamento.marca} {equipamento.modelo}
            </CardDescription>
          </div>
          {getStatusBadge(equipamento.estado, equipamento.disponivel)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {equipamento.imagem_principal && (
            <img
              src={equipamento.imagem_principal}
              alt={equipamento.nome}
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Package className="h-4 w-4 mr-1" />
              <span>{equipamento.categoria_nome}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>Qtd: {equipamento.quantidade_disponivel}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-green-600">
              {formatCurrency(equipamento.valor_diaria)}/dia
            </div>
            <Button size="sm" asChild>
              <Link to={`/equipamentos/${equipamento.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EquipamentoListItem = ({ equipamento }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {equipamento.imagem_principal ? (
            <img
              src={equipamento.imagem_principal}
              alt={equipamento.nome}
              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{equipamento.nome}</h3>
                <p className="text-sm text-gray-600">
                  {equipamento.marca} {equipamento.modelo}
                </p>
                <p className="text-sm text-gray-500">
                  {equipamento.categoria_nome}
                </p>
              </div>
              <div className="text-right">
                {getStatusBadge(equipamento.estado, equipamento.disponivel)}
                <p className="text-lg font-semibold text-green-600 mt-1">
                  {formatCurrency(equipamento.valor_diaria)}/dia
                </p>
                <p className="text-sm text-gray-500">
                  Qtd: {equipamento.quantidade_disponivel}
                </p>
              </div>
            </div>
          </div>
          
          <Button size="sm" asChild>
            <Link to={`/equipamentos/${equipamento.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Ver
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Equipamentos</h1>
            <p className="text-gray-600 mt-1">
              Encontre os equipamentos ideais para sua locação
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {isStaff && (
              <Button asChild>
                <Link to="/equipamentos/cadastrar">
                  <Plus className="h-4 w-4 mr-2" />
                  Cadastrar Equipamento
                </Link>
              </Button>
            )}
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Nome, marca, modelo..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={filters.categoria}
                    onValueChange={(value) => handleFilterChange('categoria', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id.toString()}>
                          {categoria.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Disponibilidade</Label>
                  <Select
                    value={filters.disponivel}
                    onValueChange={(value) => handleFilterChange('disponivel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="true">Apenas disponíveis</SelectItem>
                      <SelectItem value="false">Indisponíveis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marca">Marca</Label>
                  <Input
                    id="marca"
                    placeholder="Marca do equipamento"
                    value={filters.marca}
                    onChange={(e) => handleFilterChange('marca', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preco_min">Preço mínimo (R$)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="preco_min"
                      type="number"
                      placeholder="0,00"
                      value={filters.preco_min}
                      onChange={(e) => handleFilterChange('preco_min', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preco_max">Preço máximo (R$)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="preco_max"
                      type="number"
                      placeholder="999,99"
                      value={filters.preco_max}
                      onChange={(e) => handleFilterChange('preco_max', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
                <Button type="button" variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          ) : equipamentos.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  {equipamentos.length} equipamento(s) encontrado(s)
                </p>
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {equipamentos.map((equipamento) => (
                    <EquipamentoCard key={equipamento.id} equipamento={equipamento} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {equipamentos.map((equipamento) => (
                    <EquipamentoListItem key={equipamento.id} equipamento={equipamento} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Package className="h-24 w-24 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum equipamento encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou fazer uma nova busca
              </p>
              <Button onClick={clearFilters}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Equipamentos;

