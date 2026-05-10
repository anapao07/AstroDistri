import axios from 'axios';

// Definimos la URL base para que sea más fácil de mantener
const productsApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/products/api/v1/products/'
});

export const getAllProducts = () => {
    return productsApi.get('/');
};