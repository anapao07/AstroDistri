import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al cargar la App, verificar si hay tokens en el almacenamiento
        const checkAuth = () => {
            const token = localStorage.getItem('access');
            if (token) {
                // Si hay token, marcar al usuario como logueado
                setUser({ loggedIn: true });
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const loginUser = async (username, password) => {
        // La URL - urls.py
        const response = await api.post('token/', { username, password });
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        setUser({ loggedIn: true });
    };

    const logoutUser = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};