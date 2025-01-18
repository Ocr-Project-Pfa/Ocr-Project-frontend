// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api';

const API_BASE_URL_DOC = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

// Add auth interceptor to include token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication endpoints
export const authApi = {
  login: async (credentials) => {
    const response = await api.post('/auth/authenticate', {
      username: credentials.username,
      password: credentials.password
    });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', {
      username: userData.name,
      email: userData.email,
      password: userData.password
    });
    return response.data;
  },
  verifyOtp: async (username, otp) => {
    const response = await api.post('/auth/verify-otp', {
      username,
      otp
    });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Existing document endpoints
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('http://localhost:8080/api/documents/upload', formData);
  return response.data;
};

export const getAllDocuments = async () => {
  const response = await api.get('http://localhost:8080/api/documents/');
  return response.data;
};

export const getDocument = async (id) => {
  const response = await api.get(`http://localhost:8080/api/documents/${id}`);
  return response.data;
};
