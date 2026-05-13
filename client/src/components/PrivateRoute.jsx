import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // 1. Mientras carga la sesión, no se renderiza nada
    if (loading) return <div className="text-center mt-10">Cargando...</div>;

    // 2. Si hay usuario, devolvemos los componentes
    // 3. Si NO hay usuario, redirigimos al login
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;