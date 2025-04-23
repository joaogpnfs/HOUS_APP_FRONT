import API_CONFIG from './constants';
class ApiService {
  // Método para fazer requisições GET
  static async get(endpoint, params = {}) {
    try {
      const url = new URL(`${API_CONFIG.BASE_URL}${API_CONFIG.API_V1}${endpoint}`);

      // Adiciona parâmetros de consulta
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
        timeout: API_CONFIG.TIMEOUT,
      });

      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  // Método para fazer requisições POST
  static async post(endpoint, data = {}) {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_V1}${endpoint}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(data),
        timeout: API_CONFIG.TIMEOUT,
      });

      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  // Método para fazer requisições PUT
  static async put(endpoint, data = {}) {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_V1}${endpoint}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(data),
        timeout: API_CONFIG.TIMEOUT,
      });

      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  // Método para fazer requisições DELETE
  static async delete(endpoint) {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_V1}${endpoint}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: API_CONFIG.HEADERS,
        timeout: API_CONFIG.TIMEOUT,
      });

      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  // Método para lidar com as respostas
  static async _handleResponse(response) {
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  }

  // Método para lidar com erros
  static _handleError(error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.message || 'Erro desconhecido ao acessar a API',
    };
  }
}

export default ApiService;
