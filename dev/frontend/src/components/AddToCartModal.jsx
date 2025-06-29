import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Package, DollarSign, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const AddToCartModal = ({ equipamento, isOpen, onClose }) => {
  const { addToCart, checkAvailability, getValorPorModalidade, calcularValorTotal } = useCart();
  
  const [formData, setFormData] = useState({
    quantidade: '1',
    modalidade: 'diaria',
    periodo: '1',
    data_uso: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewTotal, setPreviewTotal] = useState(0);

  // Atualizar preview do total sempre que os dados mudarem
  React.useEffect(() => {
    if (equipamento && formData.quantidade && formData.modalidade && formData.periodo) {
      const total = calcularValorTotal(equipamento, formData.quantidade, formData.modalidade, formData.periodo);
      setPreviewTotal(total);
    }
  }, [equipamento, formData, calcularValorTotal]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar quantidade
    if (!formData.quantidade || formData.quantidade < 1) {
      newErrors.quantidade = 'Quantidade deve ser maior que zero';
    } else if (!Number.isInteger(Number(formData.quantidade))) {
      newErrors.quantidade = 'Quantidade deve ser um número inteiro';
    }

    // Validar modalidade
    if (!formData.modalidade) {
      newErrors.modalidade = 'Modalidade é obrigatória';
    }

    // Validar período
    if (!formData.periodo || formData.periodo < 1) {
      newErrors.periodo = 'Período deve ser maior que zero';
    } else if (!Number.isInteger(Number(formData.periodo))) {
      newErrors.periodo = 'Período deve ser um número inteiro';
    }

    // Validar data
    if (!formData.data_uso) {
      newErrors.data_uso = 'Data de uso é obrigatória';
    } else {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataUso = new Date(formData.data_uso);
      
      if (dataUso <= hoje) {
        newErrors.data_uso = 'A data de uso deve ser futura';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Verificar disponibilidade
      const availability = checkAvailability(equipamento, parseInt(formData.quantidade), formData.data_uso);
      
      if (!availability.available) {
        setErrors({ general: availability.message });
        return;
      }

      // Adicionar ao carrinho
      addToCart(
        equipamento,
        formData.quantidade,
        formData.modalidade,
        formData.periodo,
        formData.data_uso
      );

      // Fechar modal e resetar form
      onClose();
      resetForm();
      
      // Mostrar mensagem de sucesso (pode ser implementada depois)
      console.log('Item adicionado ao carrinho com sucesso!');
      
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      setErrors({ general: 'Erro ao adicionar ao carrinho. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      quantidade: '1',
      modalidade: 'diaria',
      periodo: '1',
      data_uso: ''
    });
    setErrors({});
    setPreviewTotal(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
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

  const getPeriodoLabel = (modalidade) => {
    switch (modalidade) {
      case 'diaria':
        return 'dia(s)';
      case 'semanal':
        return 'semana(s)';
      case 'mensal':
        return 'mês(es)';
      default:
        return 'período(s)';
    }
  };

  if (!equipamento) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Adicionar ao Carrinho</span>
          </DialogTitle>
          <DialogDescription>
            {equipamento.nome} - {equipamento.marca} {equipamento.modelo}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          {/* Quantidade */}
          <div className="space-y-2">
            <Label htmlFor="quantidade">Quantidade *</Label>
            <Input
              id="quantidade"
              type="number"
              min="1"
              max={equipamento.quantidade_disponivel}
              value={formData.quantidade}
              onChange={(e) => handleInputChange('quantidade', e.target.value)}
              className={errors.quantidade ? 'border-red-500' : ''}
              disabled={loading}
            />
            {errors.quantidade && (
              <p className="text-sm text-red-500">{errors.quantidade}</p>
            )}
            <p className="text-sm text-gray-500">
              Disponível: {equipamento.quantidade_disponivel} unidade(s)
            </p>
          </div>

          {/* Modalidade */}
          <div className="space-y-2">
            <Label>Modalidade de Preço *</Label>
            <Select
              value={formData.modalidade}
              onValueChange={(value) => handleInputChange('modalidade', value)}
              disabled={loading}
            >
              <SelectTrigger className={errors.modalidade ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diaria">
                  Diária - {formatCurrency(equipamento.valor_diaria)}
                </SelectItem>
                {equipamento.valor_semanal && (
                  <SelectItem value="semanal">
                    Semanal - {formatCurrency(equipamento.valor_semanal)}
                  </SelectItem>
                )}
                {equipamento.valor_mensal && (
                  <SelectItem value="mensal">
                    Mensal - {formatCurrency(equipamento.valor_mensal)}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.modalidade && (
              <p className="text-sm text-red-500">{errors.modalidade}</p>
            )}
          </div>

          {/* Período */}
          <div className="space-y-2">
            <Label htmlFor="periodo">
              Período ({getPeriodoLabel(formData.modalidade)}) *
            </Label>
            <Input
              id="periodo"
              type="number"
              min="1"
              value={formData.periodo}
              onChange={(e) => handleInputChange('periodo', e.target.value)}
              className={errors.periodo ? 'border-red-500' : ''}
              disabled={loading}
            />
            {errors.periodo && (
              <p className="text-sm text-red-500">{errors.periodo}</p>
            )}
          </div>

          {/* Data de Uso */}
          <div className="space-y-2">
            <Label htmlFor="data_uso">Data Prevista de Uso *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="data_uso"
                type="date"
                value={formData.data_uso}
                onChange={(e) => handleInputChange('data_uso', e.target.value)}
                className={`pl-10 ${errors.data_uso ? 'border-red-500' : ''}`}
                disabled={loading}
                min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Amanhã
              />
            </div>
            {errors.data_uso && (
              <p className="text-sm text-red-500">{errors.data_uso}</p>
            )}
          </div>

          {/* Preview do Total */}
          {previewTotal > 0 && (
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex items-center space-x-2 text-green-800">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">Total Estimado:</span>
              </div>
              <div className="mt-1 text-sm text-green-700">
                {formData.quantidade} × {formatCurrency(getValorPorModalidade(equipamento, formData.modalidade))} × {formData.periodo} {getPeriodoLabel(formData.modalidade)} = {formatCurrency(previewTotal)}
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Adicionando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal; 