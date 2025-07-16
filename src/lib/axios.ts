import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Interceptor para mostrar la URL completa de cada request
api.interceptors.request.use(config => {
  const fullUrl = config.baseURL
    ? config.baseURL.replace(/\/$/, '') + (config.url?.startsWith('/') ? config.url : '/' + config.url)
    : config.url;
  console.log('URL:', fullUrl);
  return config;
});

export default api