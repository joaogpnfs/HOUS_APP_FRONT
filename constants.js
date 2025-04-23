// API Configuration for React Native
const API_CONFIG = {
  // Altere para o endereço do seu servidor em produção ou desenvolvimento
  BASE_URL: 'http://10.0.2.2:8000', // Use 10.0.2.2 para acessar localhost no emulador Android
  API_V1: '/api/v1',

  // Headers padrão
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  // Timeouts (em ms)
  TIMEOUT: 15000,

  // Endpoints
  ENDPOINTS: {
    // Sistema e saúde
    HEALTH: '/health',

    // Autenticação
    LOGIN: '/login/access-token',
    LOGIN_TEST: '/login/test-token',

    // Usuários
    USERS: '/users',
    USERS_ME: '/users/me',

    // Empresas
    COMPANIES: '/companies',

    // Equipes
    TEAMS: '/teams',

    // Projetos
    PROJECTS: '/projects',
    PROJECT_DETAIL: (id) => `/projects/${id}`,

    // Propriedades/Imóveis
    PROPERTIES: '/properties',
    PROPERTY_DETAIL: (id) => `/properties/${id}`,
  },
};

export default API_CONFIG;
