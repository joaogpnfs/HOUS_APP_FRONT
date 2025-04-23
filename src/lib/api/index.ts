import axios, { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.API_URL;
const API_VERSION = process.env.API_VERSION;
const API_TIMEOUT = Number(process.env.API_TIMEOUT);

const api = axios.create({
  baseURL: `${API_URL}${API_VERSION}`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const TOKEN_KEY = 'auth_token';

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Erro ao buscar token:', error);
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return {
      ...response,
      success: true,
    };
  },
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      console.error('Erro de autenticação');
    }

    return Promise.reject({
      success: false,
      status,
      message: error.message || 'Erro ao processar requisição',
      data: error.response?.data,
      error,
    });
  },
);

export const setAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('Erro ao salvar token:', error);
    return false;
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao remover token:', error);
    return false;
  }
};

export default api;
