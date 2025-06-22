import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, User, Mail, Phone, MapPin } from 'lucide-react';

const Registro = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    cpf_cnpj: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    data_nascimento: '',
    password: '',
    password_confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

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

  const formatCpfCnpj = (value) => {
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 11) {
      // Formato CPF: XXX.XXX.XXX-XX
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      // Formato CNPJ: XX.XXX.XXX/XXXX-XX
      return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

  const formatTelefone = (value) => {
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, '');
    
    // Formato: (XX) XXXXX-XXXX
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCep = (value) => {
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, '');
    
    // Formato: XXXXX-XXX
    return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleCpfCnpjChange = (e) => {
    const formatted = formatCpfCnpj(e.target.value);
    setFormData(prev => ({
      ...prev,
      cpf_cnpj: formatted
    }));
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
    setErrors({});

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no registro:', error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          setErrors(errorData);
        } else {
          setErrors({ general: errorData });
        }
      } else {
        setErrors({ general: 'Erro de conexão. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Reflex Som</h1>
          <p className="mt-2 text-gray-600">Sistema de Locação de Equipamentos</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Criar sua conta</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para se cadastrar no sistema
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dados Pessoais</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome_completo">Nome Completo *</Label>
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
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email[0]}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf_cnpj">CPF/CNPJ *</Label>
                    <Input
                      id="cpf_cnpj"
                      name="cpf_cnpj"
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={formData.cpf_cnpj}
                      onChange={handleCpfCnpjChange}
                      maxLength={18}
                      disabled={loading}
                    />
                    {errors.cpf_cnpj && (
                      <p className="text-sm text-red-600">{errors.cpf_cnpj[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                  <Input
                    id="data_nascimento"
                    name="data_nascimento"
                    type="date"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.data_nascimento && (
                    <p className="text-sm text-red-600">{errors.data_nascimento[0]}</p>
                  )}
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Endereço</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço *</Label>
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
                    <Label htmlFor="cidade">Cidade *</Label>
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
                    <Label htmlFor="estado">Estado *</Label>
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
                    <Label htmlFor="cep">CEP *</Label>
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
              </div>

              {/* Senha */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Senha</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Sua senha"
                        value={formData.password}
                        onChange={handleChange}
                        className="pr-10"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password_confirm">Confirmar Senha *</Label>
                    <div className="relative">
                      <Input
                        id="password_confirm"
                        name="password_confirm"
                        type={showPasswordConfirm ? 'text' : 'password'}
                        required
                        placeholder="Confirme sua senha"
                        value={formData.password_confirm}
                        onChange={handleChange}
                        className="pr-10"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showPasswordConfirm ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    {errors.password_confirm && (
                      <p className="text-sm text-red-600">{errors.password_confirm[0]}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar conta'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Faça login aqui
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Registro;

