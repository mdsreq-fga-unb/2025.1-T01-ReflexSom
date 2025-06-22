import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { clienteService } from '../lib/api';
import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

const Perfil = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    nome_completo: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    data_nascimento: '',
  });
  const [senhaData, setSenhaData] = useState({
    senha_atual: '',
    nova_senha: '',
    confirmar_nova_senha: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    atual: false,
    nova: false,
    confirmar: false,
  });
  const [loading, setLoading] = useState(false);
  const [loadingSenha, setLoadingSenha] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [messageSenha, setMessageSenha] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadPerfil();
  }, []);

  const loadPerfil = async () => {
    try {
      const perfil = await clienteService.getPerfil();
      setFormData({
        nome_completo: perfil.nome_completo || '',
        telefone: perfil.telefone || '',
        endereco: perfil.endereco || '',
        cidade: perfil.cidade || '',
        estado: perfil.estado || '',
        cep: perfil.cep || '',
        data_nascimento: perfil.data_nascimento || '',
      });
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      setMessage({
        type: 'error',
        text: 'Erro ao carregar dados do perfil.'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro específico ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSenhaChange = (e) => {
    const { name, value } = e.target;
    setSenhaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatTelefone = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCep = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }));
  };

  const handleCepChange = (e) => {
    const formatted = formatCep(e.target.value);
    setFormData(prev => ({
      ...prev,
      cep: formatted
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    setErrors({});

    try {
      const response = await clienteService.updatePerfil(formData);
      updateUser(response.cliente);
      setMessage({
        type: 'success',
        text: 'Perfil atualizado com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          setErrors(errorData);
        } else {
          setMessage({
            type: 'error',
            text: errorData
          });
        }
      } else {
        setMessage({
          type: 'error',
          text: 'Erro ao atualizar perfil. Tente novamente.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAlterarSenha = async (e) => {
    e.preventDefault();
    setLoadingSenha(true);
    setMessageSenha({ type: '', text: '' });

    try {
      await clienteService.alterarSenha(senhaData);
      setMessageSenha({
        type: 'success',
        text: 'Senha alterada com sucesso!'
      });
      setSenhaData({
        senha_atual: '',
        nova_senha: '',
        confirmar_nova_senha: '',
      });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          const errorMessage = Object.values(errorData).flat().join(' ');
          setMessageSenha({
            type: 'error',
            text: errorMessage
          });
        } else {
          setMessageSenha({
            type: 'error',
            text: errorData
          });
        }
      } else {
        setMessageSenha({
          type: 'error',
          text: 'Erro ao alterar senha. Tente novamente.'
        });
      }
    } finally {
      setLoadingSenha(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Dados Pessoais</span>
              </CardTitle>
              <CardDescription>
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {message.text && (
                  <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                    <AlertDescription>{message.text}</AlertDescription>
                  </Alert>
                )}

                {/* Informações não editáveis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <p className="text-sm text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">CPF/CNPJ</Label>
                    <p className="text-sm text-gray-900">{user?.cpf_cnpj}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nome_completo">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="nome_completo"
                      name="nome_completo"
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      value={formData.nome_completo}
                      onChange={handleChange}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                  {errors.nome_completo && (
                    <p className="text-sm text-red-600">{errors.nome_completo[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="telefone"
                      name="telefone"
                      type="text"
                      required
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={handleTelefoneChange}
                      className="pl-10"
                      maxLength={15}
                      disabled={loading}
                    />
                  </div>
                  {errors.telefone && (
                    <p className="text-sm text-red-600">{errors.telefone[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="data_nascimento"
                      name="data_nascimento"
                      type="date"
                      value={formData.data_nascimento}
                      onChange={handleChange}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                  {errors.data_nascimento && (
                    <p className="text-sm text-red-600">{errors.data_nascimento[0]}</p>
                  )}
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Endereço</h3>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="endereco"
                      name="endereco"
                      type="text"
                      required
                      placeholder="Rua, número, complemento"
                      value={formData.endereco}
                      onChange={handleChange}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                  {errors.endereco && (
                    <p className="text-sm text-red-600">{errors.endereco[0]}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      name="cidade"
                      type="text"
                      required
                      placeholder="Sua cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {errors.cidade && (
                      <p className="text-sm text-red-600">{errors.cidade[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      name="estado"
                      type="text"
                      required
                      placeholder="UF"
                      value={formData.estado}
                      onChange={handleChange}
                      maxLength={2}
                      disabled={loading}
                    />
                    {errors.estado && (
                      <p className="text-sm text-red-600">{errors.estado[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      name="cep"
                      type="text"
                      required
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={handleCepChange}
                      maxLength={9}
                      disabled={loading}
                    />
                    {errors.cep && (
                      <p className="text-sm text-red-600">{errors.cep[0]}</p>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>Salvando...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Alterar Senha */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Alterar Senha</span>
              </CardTitle>
              <CardDescription>
                Altere sua senha de acesso
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleAlterarSenha}>
              <CardContent className="space-y-4">
                {messageSenha.text && (
                  <Alert variant={messageSenha.type === 'error' ? 'destructive' : 'default'}>
                    <AlertDescription>{messageSenha.text}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="senha_atual">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="senha_atual"
                      name="senha_atual"
                      type={showPasswords.atual ? 'text' : 'password'}
                      required
                      placeholder="Sua senha atual"
                      value={senhaData.senha_atual}
                      onChange={handleSenhaChange}
                      className="pr-10"
                      disabled={loadingSenha}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('atual')}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                      disabled={loadingSenha}
                    >
                      {showPasswords.atual ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nova_senha">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="nova_senha"
                      name="nova_senha"
                      type={showPasswords.nova ? 'text' : 'password'}
                      required
                      placeholder="Sua nova senha"
                      value={senhaData.nova_senha}
                      onChange={handleSenhaChange}
                      className="pr-10"
                      disabled={loadingSenha}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('nova')}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                      disabled={loadingSenha}
                    >
                      {showPasswords.nova ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmar_nova_senha">Confirmar Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmar_nova_senha"
                      name="confirmar_nova_senha"
                      type={showPasswords.confirmar ? 'text' : 'password'}
                      required
                      placeholder="Confirme sua nova senha"
                      value={senhaData.confirmar_nova_senha}
                      onChange={handleSenhaChange}
                      className="pr-10"
                      disabled={loadingSenha}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmar')}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                      disabled={loadingSenha}
                    >
                      {showPasswords.confirmar ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" disabled={loadingSenha} className="w-full">
                  {loadingSenha ? (
                    <>Alterando...</>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Alterar Senha
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Perfil;

