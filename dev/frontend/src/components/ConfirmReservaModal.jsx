import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const ConfirmReservaModal = ({ isOpen, onClose, cartItems, onConfirm }) => {
  const [formData, setFormData] = useState({
    data_uso: '',
    observacoes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    // Validar data de uso
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
      await onConfirm(formData);
      handleClose();
    } catch (error) {
      console.error('Erro ao confirmar reserva:', error);
      setErrors({ general: 'Erro ao processar reserva. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      data_uso: '',
      observacoes: ''
    });
    setErrors({});
    onClose();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calcularTotalCarrinho = () => {
    return cartItems.reduce((total, item) => total + item.valor_total, 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Confirmar Solicitação de Reserva</span>
          </DialogTitle>
          <DialogDescription>
            Revise os dados da sua reserva e confirme a solicitação
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          {/* Resumo dos Itens */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Itens da Reserva</h3>
            <div className="max-h-60 overflow-y-auto space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {item.equipamento_imagem ? (
                      <img
                        src={item.equipamento_imagem}
                        alt={item.equipamento_nome}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-sm">{item.equipamento_nome}</h4>
                      <p className="text-xs text-gray-600">
                        {item.equipamento_marca} {item.equipamento_modelo}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qtd: {item.quantidade} | {item.modalidade} | {item.periodo} período(s)
                      </p>
                      <p className="text-xs text-gray-500">
                        Data original: {formatDate(item.data_uso)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{formatCurrency(item.valor_total)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-lg font-semibold">Total Estimado:</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(calcularTotalCarrinho())}
              </span>
            </div>
          </div>

          {/* Data de Uso */}
          <div className="space-y-2">
            <Label htmlFor="data_uso">Data de Uso *</Label>
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
            <p className="text-sm text-gray-500">
              Data em que você pretende usar os equipamentos
            </p>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações Adicionais</Label>
            <Textarea
              id="observacoes"
              placeholder="Informações adicionais sobre a reserva (opcional)"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              disabled={loading}
              rows={3}
            />
            <p className="text-sm text-gray-500">
              Detalhes sobre o evento, horários, local, etc.
            </p>
          </div>

          {/* Informações Importantes */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Informações Importantes:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Esta é uma solicitação de reserva que será analisada pela equipe</li>
              <li>• Você receberá uma confirmação por email sobre o status</li>
              <li>• Os valores são estimados e podem sofrer alterações</li>
              <li>• A disponibilidade será verificada novamente antes da aprovação</li>
            </ul>
          </div>

          {/* Botões */}
          <div className="flex space-x-3 pt-4">
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
                  Enviando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Reserva
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmReservaModal; 