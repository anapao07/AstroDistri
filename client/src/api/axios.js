import axios from 'axios';
const env = import.meta.env;

const api = axios.create({
    baseURL: env.VITE_API_BASE_URL
});

// token a cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Manejar tokens expirados
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh');
                const response = await axios.post(env.VITE_API_TOKEN_REFRESH, {
                    refresh: refreshToken
                });
                localStorage.setItem('access', response.data.access);
                return api(originalRequest);
            } catch (err) {
                localStorage.clear();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;