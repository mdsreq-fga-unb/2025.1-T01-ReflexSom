import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { equipamentoService } from '../lib/api';
import Layout from './Layout';
import ConfirmReservaModal from './ConfirmReservaModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Calendar,
  Package,
  DollarSign,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

const Carrinho = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
      year: 'numeric'
    });
  };

  const getModalidadeLabel = (modalidade) => {
    switch (modalidade) {
      case 'diaria':
        return 'Diária';
      case 'semanal':
        return 'Semanal';
      case 'mensal':
        return 'Mensal';
      default:
        return modalidade;
    }
  };

  const getPeriodoLabel = (modalidade, periodo) => {
    switch (modalidade) {
      case 'diaria':
        return `${periodo} dia${periodo > 1 ? 's' : ''}`;
      case 'semanal':
        return `${periodo} semana${periodo > 1 ? 's' : ''}`;
      case 'mensal':
        return `${periodo} mês${periodo > 1 ? 'es' : ''}`;
      default:
        return `${periodo} período${periodo > 1 ? 's' : ''}`;
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      clearCart();
    }
  };

  const handleSolicitarReserva = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmReserva = async (formData) => {
    setLoading(true);
    
    try {
      // 1. Verificar disponibilidade
      const itensParaVerificar = cartItems.map(item => ({
        equipamento_id: item.equipamento_id,
        quantidade: item.quantidade
      }));

      const verificacao = await equipamentoService.verificarDisponibilidade(
        formData.data_uso,
        itensParaVerificar
      );

      if (!verificacao.todos_disponiveis) {
        // Mostrar quais equipamentos estão indisponíveis
        const indisponiveis = verificacao.resultados
          .filter(r => !r.disponivel)
          .map(r => r.equipamento_nome || `Equipamento ID ${r.equipamento_id}`)
          .join(', ');
        
        throw new Error(`Os seguintes equipamentos estão indisponíveis: ${indisponiveis}. Por favor, ajuste as quantidades ou escolha uma data diferente.`);
      }

      // 2. Criar reserva
      const reservaData = {
        data_uso: formData.data_uso,
        observacoes: formData.observacoes,
        itens: cartItems.map(item => ({
          equipamento: item.equipamento_id,
          quantidade: item.quantidade,
          modalidade: item.modalidade,
          periodo: item.periodo,
          valor_unitario: item.valor_unitario,
          valor_total: item.valor_total
        }))
      };

      const response = await equipamentoService.criarReserva(reservaData);
      
      // 3. Limpar carrinho e mostrar sucesso
      clearCart();
      setSuccessMessage('Reserva enviada com sucesso! Aguarde aprovação.');
      
      // Scroll para o topo para mostrar a mensagem
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Erro ao solicitar reserva:', error);
      throw error; // Repassar erro para o modal tratar
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/equipamentos');
  };

  // Se há mensagem de sucesso, mostrar ela
  if (successMessage) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <CheckCircle className="h-24 w-24 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reserva Enviada!</h2>
            <p className="text-gray-600 mb-6">
              {successMessage}
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Você receberá um email com a confirmação e status da sua reserva.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleContinueShopping}>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continuar Comprando
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Ir para Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">
              Adicione alguns equipamentos ao seu carrinho para começar
            </p>
            <Button onClick={handleContinueShopping}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continuar Comprando
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Carrinho de Compras
              </h1>
              <p className="text-gray-600">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} no carrinho
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Carrinho
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Itens */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Imagem do Equipamento */}
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      {item.equipamento_imagem ? (
                        <img
                          src={item.equipamento_imagem}
                          alt={item.equipamento_nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Informações do Item */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.equipamento_nome}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.equipamento_marca} {item.equipamento_modelo}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Badge variant="outline">{item.equipamento_categoria}</Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <Separator className="my-4" />

                      {/* Detalhes da Locação */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Modalidade</p>
                          <p className="text-sm text-gray-600">
                            {getModalidadeLabel(item.modalidade)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Período</p>
                          <p className="text-sm text-gray-600">
                            {getPeriodoLabel(item.modalidade, item.periodo)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Data de Uso</p>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(item.data_uso)}</span>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      {/* Quantidade e Preço */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">Quantidade:</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantidade - 1)}
                              disabled={item.quantidade <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantidade}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantidade + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {item.quantidade} × {formatCurrency(item.valor_unitario)} × {item.periodo}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {formatCurrency(item.valor_total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Orçamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate mr-2">
                        {item.equipamento_nome} (x{item.quantidade})
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.valor_total)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(getCartTotal())}</span>
                </div>

                <div className="space-y-2 pt-4">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSolicitarReserva}
                    disabled={loading}
                  >
                    {loading ? (
                      'Processando...'
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Solicitar Reserva
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleContinueShopping}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Continuar Comprando
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informações Importantes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Informações Importantes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Os valores são estimados e podem variar</li>
                  <li>• Confirme a disponibilidade antes da finalização</li>
                  <li>• Equipamentos sujeitos à aprovação</li>
                  <li>• Entrega e retirada mediante agendamento</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Confirmação de Reserva */}
        <ConfirmReservaModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          cartItems={cartItems}
          onConfirm={handleConfirmReserva}
        />
      </div>
    </Layout>
  );
};

export default Carrinho; 