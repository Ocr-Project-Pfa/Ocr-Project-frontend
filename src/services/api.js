// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/documents';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData);
  return response.data;
};

export const getAllDocuments = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getDocument = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};
