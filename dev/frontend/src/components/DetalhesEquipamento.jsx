import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { equipamentoService } from '../lib/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout';
import AddToCartModal from './AddToCartModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Package,
  Tag,
  DollarSign,
  Hash,
  FileText,
  Image as ImageIcon,
  Settings,
  Calendar,
  MapPin,
  ShoppingCart,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DetalhesEquipamento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInCart } = useCart();
  const { user } = useAuth();
  const [equipamento, setEquipamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imagemPrincipalError, setImagemPrincipalError] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [canDelete, setCanDelete] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    loadEquipamento();
  }, [id]);

  useEffect(() => {
    if (user?.is_staff && equipamento) {
      checkCanDelete();
    }
  }, [user, equipamento]);

  const loadEquipamento = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await equipamentoService.obterDetalhes(id);
      setEquipamento(response);
    } catch (error) {
      console.error('Erro ao carregar equipamento:', error);
      setError('Erro ao carregar detalhes do equipamento');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    setShowAddToCartModal(true);
  };

  const checkCanDelete = async () => {
    try {
      const response = await equipamentoService.verificarPodeDeletar(id);
      setCanDelete(response.can_delete);
      if (!response.can_delete) {
        setDeleteMessage(response.message);
      }
    } catch (error) {
      console.error('Erro ao verificar se pode deletar:', error);
      setCanDelete(false);
    }
  };

  const handleDeleteEquipamento = async () => {
    try {
      setDeleteLoading(true);
      setDeleteError('');
      
      const response = await equipamentoService.deletar(id);
      
      if (response.can_delete) {
        // Sucesso - redirecionar para lista de equipamentos
        navigate('/equipamentos', { 
          state: { 
            message: response.message,
            type: 'success' 
          }
        });
      }
    } catch (error) {
      console.error('Erro ao deletar equipamento:', error);
      
      if (error.response?.data?.error) {
        setDeleteError(error.response.data.error);
      } else {
        setDeleteError('Erro ao remover equipamento. Tente novamente.');
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const handleImageError = () => {
    setImagemPrincipalError(true);
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

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">Erro ao carregar equipamento</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => navigate('/equipamentos')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Equipamentos
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!equipamento) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Equipamento não encontrado</h2>
            <p className="text-gray-600 mb-4">O equipamento solicitado não foi encontrado.</p>
            <Button onClick={() => navigate('/equipamentos')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Equipamentos
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/equipamentos')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {equipamento.nome}
              </h1>
              <p className="text-lg text-gray-600">
                {equipamento.marca} {equipamento.modelo}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(equipamento.estado, equipamento.disponivel)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Informações Básicas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Tag className="h-4 w-4" />
                      <span className="text-sm">Categoria</span>
                    </div>
                    <p className="font-medium">{equipamento.categoria_nome}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Hash className="h-4 w-4" />
                      <span className="text-sm">Quantidade Disponível</span>
                    </div>
                    <p className="font-medium">{equipamento.quantidade_disponivel} de {equipamento.quantidade_total}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Data de Cadastro</span>
                  </div>
                  <p className="font-medium">{formatDate(equipamento.data_cadastro)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Descrição</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {equipamento.descricao}
                </p>
              </CardContent>
            </Card>

            {/* Especificações Técnicas */}
            {equipamento.especificacoes_tecnicas && Object.keys(equipamento.especificacoes_tecnicas).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Especificações Técnicas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(equipamento.especificacoes_tecnicas).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Valores de Locação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Valores de Locação</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-600">Valor Diária</p>
                  <p className="text-2xl font-bold text-green-700">
                    {formatCurrency(equipamento.valor_diaria)}
                  </p>
                  <p className="text-sm text-green-600">por dia</p>
                </div>

                {equipamento.valor_semanal && (
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-600">Valor Semanal</p>
                    <p className="text-xl font-bold text-blue-700">
                      {formatCurrency(equipamento.valor_semanal)}
                    </p>
                    <p className="text-sm text-blue-600">por semana</p>
                  </div>
                )}

                {equipamento.valor_mensal && (
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm font-medium text-purple-600">Valor Mensal</p>
                    <p className="text-xl font-bold text-purple-700">
                      {formatCurrency(equipamento.valor_mensal)}
                    </p>
                    <p className="text-sm text-purple-600">por mês</p>
                  </div>
                )}

                <Separator />

                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={!equipamento.disponivel}
                  onClick={handleAddToCart}
                >
                  {equipamento.disponivel ? (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isInCart(equipamento.id) ? 'Adicionar Novamente' : 'Adicionar ao Carrinho'}
                    </>
                  ) : (
                    'Indisponível'
                  )}
                </Button>

                {/* Botão de Remoção para Administradores */}
                {user?.is_staff && (
                  <>
                    <Separator />
                    
                    {deleteError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{deleteError}</AlertDescription>
                      </Alert>
                    )}

                    {!canDelete && deleteMessage && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{deleteMessage}</AlertDescription>
                      </Alert>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          disabled={!canDelete || deleteLoading}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {deleteLoading ? 'Removendo...' : 'Remover Equipamento'}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remover Equipamento</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza de que deseja remover este equipamento? Esta ação não poderá ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteEquipamento}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Sim, remover
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Imagens */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5" />
                  <span>Imagens</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Imagem Principal */}
                {equipamento.imagem_principal && !imagemPrincipalError ? (
                  <div className="aspect-square overflow-hidden rounded-lg border">
                    <img
                      src={equipamento.imagem_principal}
                      alt={equipamento.nome}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      onError={handleImageError}
                    />
                  </div>
                ) : (
                  <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Sem imagem disponível</p>
                    </div>
                  </div>
                )}

                {/* Imagens Adicionais */}
                {equipamento.imagens_adicionais && equipamento.imagens_adicionais.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Imagens Adicionais:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {equipamento.imagens_adicionais.map((url, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded border">
                          <img
                            src={url}
                            alt={`${equipamento.nome} - ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Adicionar ao Carrinho */}
      <AddToCartModal
        equipamento={equipamento}
        isOpen={showAddToCartModal}
        onClose={() => setShowAddToCartModal(false)}
      />
    </Layout>
  );
};

export default DetalhesEquipamento; 