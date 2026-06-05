// API utility for dynamic base URL based on environment
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
};

export default API_BASE_URL;
