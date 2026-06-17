import axios from 'axios';


const productsApi = axios.create({
    baseURL: import.meta.env.VITE_API_PRODUCTS_URL
});

const statusApi = axios.create({
    baseURL: import.meta.env.VITE_API_STATUS_URL
});  


export const getAllProducts = () => {
     return productsApi.get('/');
};

export const bulkUploadProducts = (formData) => {
    return productsApi.post('/bulk_upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const createProducts = (product) => {
    return productsApi.post('/', product);
};

export const deleteProducts = (id) => {
    return productsApi.delete(`/${id}/`);
};

export const updateProducts = (id , product) => {
    return productsApi.put(`/${id}/`, product);
};

export const getProduct = (id) => {
    return productsApi.get(`/${id}/`);
};

export const getAllStatuss = () => {
     return statusApi.get('/');
};