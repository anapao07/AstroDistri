import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading('Verificando credenciales...');
        try {
            await loginUser(username, password);
            toast.success('¡Bienvenido de nuevo!', { id: loadToast });
            navigate('/products');
        } catch (error) {
            toast.error('Usuario o contraseña incorrectos', { id: loadToast });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-[#111] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-800">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
                    <p className="text-zinc-500">Ingresa tus datos para gestionar tus productos</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-zinc-400 text-sm font-medium mb-2">Usuario</label>
                        <input 
                            type="text" 
                            className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="Tu nombre de usuario"
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-zinc-400 text-sm font-medium mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="••••••••"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/20"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-zinc-800 pt-6">
                    <p className="text-zinc-500 text-sm">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}