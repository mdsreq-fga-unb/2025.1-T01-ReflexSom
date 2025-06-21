import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { equipamentoService } from '../lib/api';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, 
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Plus,
  X
} from 'lucide-react';

const CadastrarEquipamento = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    descricao: '',
    marca: '',
    modelo: '',
    especificacoes_tecnicas: {},
    valor_diaria: '',
    valor_semanal: '',
    valor_mensal: '',
    estado: 'disponivel',
    quantidade_disponivel: '1',
    quantidade_total: '1',
    numero_serie: '',
    observacoes: '',
    imagem_principal: '',
    imagens_adicionais: []
  });

  const [especificacaoTemp, setEspecificacaoTemp] = useState({ chave: '', valor: '' });
  const [imagemTemp, setImagemTemp] = useState('');

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const response = await equipamentoService.listarCategorias();
      setCategorias(Array.isArray(response) ? response : response.results || response.categorias || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar categorias' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEspecificacaoAdd = () => {
    if (especificacaoTemp.chave && especificacaoTemp.valor) {
      setFormData(prev => ({
        ...prev,
        especificacoes_tecnicas: {
          ...prev.especificacoes_tecnicas,
          [especificacaoTemp.chave]: especificacaoTemp.valor
        }
      }));
      setEspecificacaoTemp({ chave: '', valor: '' });
    }
  };

  const handleEspecificacaoRemove = (chave) => {
    setFormData(prev => {
      const newEspecificacoes = { ...prev.especificacoes_tecnicas };
      delete newEspecificacoes[chave];
      return {
        ...prev,
        especificacoes_tecnicas: newEspecificacoes
      };
    });
  };

  const handleImagemAdd = () => {
    if (imagemTemp.trim()) {
      setFormData(prev => ({
        ...prev,
        imagens_adicionais: [...prev.imagens_adicionais, imagemTemp.trim()]
      }));
      setImagemTemp('');
    }
  };

  const handleImagemRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      imagens_adicionais: prev.imagens_adicionais.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const requiredFields = ['nome', 'categoria', 'descricao', 'marca', 'modelo', 'valor_diaria'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setMessage({ type: 'error', text: `Campos obrigatórios não preenchidos: ${missingFields.join(', ')}` });
      return false;
    }

    if (parseFloat(formData.valor_diaria) <= 0) {
      setMessage({ type: 'error', text: 'O valor da diária deve ser maior que zero' });
      return false;
    }

    if (parseInt(formData.quantidade_total) < parseInt(formData.quantidade_disponivel)) {
      setMessage({ type: 'error', text: 'A quantidade disponível não pode ser maior que a quantidade total' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setMessage({ type: '', text: '' });

      // Preparar dados para envio
      const dadosParaEnvio = {
        ...formData,
        valor_diaria: parseFloat(formData.valor_diaria),
        valor_semanal: formData.valor_semanal ? parseFloat(formData.valor_semanal) : null,
        valor_mensal: formData.valor_mensal ? parseFloat(formData.valor_mensal) : null,
        quantidade_disponivel: parseInt(formData.quantidade_disponivel),
        quantidade_total: parseInt(formData.quantidade_total),
        categoria: parseInt(formData.categoria)
      };

      const response = await equipamentoService.criar(dadosParaEnvio);
      
      setMessage({ type: 'success', text: 'Equipamento cadastrado com sucesso!' });
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/equipamentos');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar equipamento:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.detail || 
                          'Erro ao cadastrar equipamento';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/equipamentos')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cadastrar Equipamento</h1>
              <p className="text-gray-600 mt-1">
                Adicione um novo equipamento ao catálogo
              </p>
            </div>
          </div>
        </div>

        {/* Mensagens */}
        {message.text && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Informações Básicas</span>
              </CardTitle>
              <CardDescription>
                Dados principais do equipamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Equipamento *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Ex: Caixa de Som JBL"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => handleInputChange('categoria', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id.toString()}>
                          {categoria.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marca">Marca *</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => handleInputChange('marca', e.target.value)}
                    placeholder="Ex: JBL"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={formData.modelo}
                    onChange={(e) => handleInputChange('modelo', e.target.value)}
                    placeholder="Ex: EON 615"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  placeholder="Descreva o equipamento, suas características e funcionalidades..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numero_serie">Número de Série</Label>
                <Input
                  id="numero_serie"
                  value={formData.numero_serie}
                  onChange={(e) => handleInputChange('numero_serie', e.target.value)}
                  placeholder="Número de série do equipamento"
                />
              </div>
            </CardContent>
          </Card>

          {/* Valores */}
          <Card>
            <CardHeader>
              <CardTitle>Valores de Locação</CardTitle>
              <CardDescription>
                Defina os valores para diferentes períodos de locação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor_diaria">Valor Diária (R$) *</Label>
                  <Input
                    id="valor_diaria"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.valor_diaria}
                    onChange={(e) => handleInputChange('valor_diaria', e.target.value)}
                    placeholder="0,00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor_semanal">Valor Semanal (R$)</Label>
                  <Input
                    id="valor_semanal"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.valor_semanal}
                    onChange={(e) => handleInputChange('valor_semanal', e.target.value)}
                    placeholder="0,00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor_mensal">Valor Mensal (R$)</Label>
                  <Input
                    id="valor_mensal"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.valor_mensal}
                    onChange={(e) => handleInputChange('valor_mensal', e.target.value)}
                    placeholder="0,00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quantidade e Estado */}
          <Card>
            <CardHeader>
              <CardTitle>Quantidade e Estado</CardTitle>
              <CardDescription>
                Configure a quantidade disponível e o estado do equipamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantidade_total">Quantidade Total *</Label>
                  <Input
                    id="quantidade_total"
                    type="number"
                    min="1"
                    value={formData.quantidade_total}
                    onChange={(e) => handleInputChange('quantidade_total', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantidade_disponivel">Quantidade Disponível *</Label>
                  <Input
                    id="quantidade_disponivel"
                    type="number"
                    min="0"
                    max={formData.quantidade_total}
                    value={formData.quantidade_disponivel}
                    onChange={(e) => handleInputChange('quantidade_disponivel', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => handleInputChange('estado', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponivel">Disponível</SelectItem>
                      <SelectItem value="locado">Locado</SelectItem>
                      <SelectItem value="manutencao">Em Manutenção</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Especificações Técnicas */}
          <Card>
            <CardHeader>
              <CardTitle>Especificações Técnicas</CardTitle>
              <CardDescription>
                Adicione especificações técnicas do equipamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Chave (ex: Potência)"
                  value={especificacaoTemp.chave}
                  onChange={(e) => setEspecificacaoTemp(prev => ({ ...prev, chave: e.target.value }))}
                />
                <Input
                  placeholder="Valor (ex: 1000W)"
                  value={especificacaoTemp.valor}
                  onChange={(e) => setEspecificacaoTemp(prev => ({ ...prev, valor: e.target.value }))}
                />
                <Button type="button" onClick={handleEspecificacaoAdd}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {Object.keys(formData.especificacoes_tecnicas).length > 0 && (
                <div className="space-y-2">
                  <Label>Especificações Adicionadas:</Label>
                  <div className="space-y-2">
                    {Object.entries(formData.especificacoes_tecnicas).map(([chave, valor]) => (
                      <div key={chave} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span><strong>{chave}:</strong> {valor}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleEspecificacaoRemove(chave)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Imagens */}
          <Card>
            <CardHeader>
              <CardTitle>Imagens</CardTitle>
              <CardDescription>
                URLs das imagens do equipamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imagem_principal">Imagem Principal</Label>
                <Input
                  id="imagem_principal"
                  type="url"
                  value={formData.imagem_principal}
                  onChange={(e) => handleInputChange('imagem_principal', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label>Imagens Adicionais</Label>
                <div className="flex space-x-2">
                  <Input
                    type="url"
                    placeholder="https://exemplo.com/imagem2.jpg"
                    value={imagemTemp}
                    onChange={(e) => setImagemTemp(e.target.value)}
                  />
                  <Button type="button" onClick={handleImagemAdd}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.imagens_adicionais.length > 0 && (
                  <div className="space-y-2">
                    <Label>Imagens Adicionadas:</Label>
                    <div className="space-y-2">
                      {formData.imagens_adicionais.map((url, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="truncate">{url}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleImagemRemove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
              <CardDescription>
                Informações adicionais sobre o equipamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  placeholder="Observações adicionais, instruções de uso, etc..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/equipamentos')}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cadastrando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Cadastrar Equipamento
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CadastrarEquipamento; 