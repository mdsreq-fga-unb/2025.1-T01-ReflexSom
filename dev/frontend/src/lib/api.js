import axios from 'axios';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos timeout
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e renovar token se necessário
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          // Repetir a requisição original com o novo token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Token de refresh inválido, fazer logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  // Registro de cliente
  async register(userData) {
    const response = await api.post('/clientes/registro/', userData);
    return response.data;
  },

  // Login
  async login(credentials) {
    const response = await api.post('/clientes/login/', credentials);
    const { tokens } = response.data;
    
    // Salvar tokens no localStorage
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    
    return response.data;
  },

  // Logout
  async logout() {
    const refreshToken = localStorage.getItem('refresh_token');
    
    try {
      await api.post('/clientes/logout/', {
        refresh_token: refreshToken,
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Limpar tokens independentemente do resultado
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  // Verificar se está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },

  // Obter informações do usuário
  async getUserInfo() {
    const response = await api.get('/clientes/info/');
    return response.data;
  },
};

// Serviços de cliente
export const clienteService = {
  // Obter perfil
  async getPerfil() {
    const response = await api.get('/clientes/perfil/');
    return response.data;
  },

  // Atualizar perfil
  async updatePerfil(userData) {
    const response = await api.put('/clientes/perfil/', userData);
    return response.data;
  },

  // Alterar senha
  async alterarSenha(senhaData) {
    const response = await api.post('/clientes/alterar-senha/', senhaData);
    return response.data;
  },

  // Verificar email
  async verificarEmail(email) {
    const response = await api.post('/clientes/verificar-email/', { email });
    return response.data;
  },

  // Verificar CPF/CNPJ
  async verificarCpfCnpj(cpf_cnpj) {
    const response = await api.post('/clientes/verificar-cpf-cnpj/', { cpf_cnpj });
    return response.data;
  },
};

// Serviços de equipamentos
export const equipamentoService = {
  // Listar equipamentos
  async listar(params = {}) {
    const response = await api.get('/equipamentos/', { params });
    return response.data;
  },

  // Obter detalhes do equipamento
  async obterDetalhes(id) {
    const response = await api.get(`/equipamentos/${id}/`);
    return response.data;
  },

  // Criar equipamento (apenas admin)
  async criar(equipamentoData) {
    const response = await api.post('/equipamentos/criar/', equipamentoData);
    return response.data;
  },

  // Atualizar equipamento (apenas admin)
  async atualizar(id, equipamentoData) {
    const response = await api.put(`/equipamentos/${id}/editar/`, equipamentoData);
    return response.data;
  },

  // Deletar equipamento (apenas admin)
  async deletar(id) {
    const response = await api.delete(`/equipamentos/${id}/deletar/`);
    return response.data;
  },

  // Verificar se pode deletar equipamento
  async verificarPodeDeletar(id) {
    const response = await api.get(`/equipamentos/${id}/pode-deletar/`);
    return response.data;
  },

  // Listar equipamentos disponíveis
  async listarDisponiveis() {
    const response = await api.get('/equipamentos/disponiveis/');
    return response.data;
  },

  // Buscar equipamentos
  async buscar(query, params = {}) {
    const response = await api.get('/equipamentos/buscar/', {
      params: { q: query, ...params }
    });
    return response.data;
  },

  // Calcular valor
  async calcularValor(equipamentoId, dias) {
    const response = await api.post('/equipamentos/calcular-valor/', {
      equipamento_id: equipamentoId,
      dias: dias,
    });
    return response.data;
  },

  // Listar categorias
  async listarCategorias() {
    const response = await api.get('/equipamentos/categorias/');
    return response.data;
  },

  // Equipamentos por categoria
  async listarPorCategoria(categoriaId, params = {}) {
    const response = await api.get(`/equipamentos/categoria/${categoriaId}/`, { params });
    return response.data;
  },

  // Verificar disponibilidade
  async verificarDisponibilidade(dataUso, itens) {
    const response = await api.post('/equipamentos/verificar-disponibilidade/', {
      data_uso: dataUso,
      itens: itens
    });
    return response.data;
  },

  // Criar reserva
  async criarReserva(reservaData) {
    const response = await api.post('/equipamentos/reservas/criar/', reservaData);
    return response.data;
  },

  // Listar reservas do cliente
  async listarReservas() {
    const response = await api.get('/equipamentos/reservas/');
    return response.data;
  },

  // Obter detalhes de uma reserva
  async obterDetalheReserva(id) {
    const response = await api.get(`/equipamentos/reservas/${id}/`);
    return response.data;
  },
};

// Serviços de administração de reservas (apenas staff)
export const adminReservaService = {
  // Listar todas as reservas (admin)
  async listarTodasReservas(filtros = {}) {
    const params = new URLSearchParams();
    
    if (filtros.status) params.append('status', filtros.status);
    if (filtros.cliente_id) params.append('cliente_id', filtros.cliente_id);
    if (filtros.data_inicio) params.append('data_inicio', filtros.data_inicio);
    if (filtros.data_fim) params.append('data_fim', filtros.data_fim);
    
    const response = await api.get(`/equipamentos/admin/reservas/?${params}`);
    return response.data;
  },

  // Detalhes de uma reserva (admin)
  async obterReservaAdmin(id) {
    const response = await api.get(`/equipamentos/admin/reservas/${id}/`);
    return response.data;
  },

  // Aprovar reserva
  async aprovarReserva(id) {
    const response = await api.post(`/equipamentos/admin/reservas/${id}/aprovar/`);
    return response.data;
  },

  // Rejeitar reserva
  async rejeitarReserva(id, motivo = '') {
    const response = await api.post(`/equipamentos/admin/reservas/${id}/rejeitar/`, {
      motivo
    });
    return response.data;
  },

  // Estatísticas de reservas
  async obterEstatisticas() {
    const response = await api.get('/equipamentos/admin/reservas/estatisticas/');
    return response.data;
  },
};

export default api;

