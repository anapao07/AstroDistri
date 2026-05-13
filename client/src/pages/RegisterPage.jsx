import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        re_password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.re_password) {
            return toast.error("Las contraseñas no coinciden");
        }

        try {
            await api.post('auth/registration/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            toast.success('Registro exitoso. ¡Ahora puedes loguearte!');
            navigate('/login');
        } catch (error) {
            const errorMsg = error.response?.data ? Object.values(error.response.data)[0] : "Error al registrar";
            toast.error(String(errorMsg));
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Crear Cuenta</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    type="text" placeholder="Usuario" className="p-2 border rounded"
                    onChange={e => setFormData({...formData, username: e.target.value})}
                    required
                />
                <input 
                    type="email" placeholder="Email" className="p-2 border rounded"
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                />
                <input 
                    type="password" placeholder="Contraseña" className="p-2 border rounded"
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    required
                />
                <input 
                    type="password" placeholder="Confirmar Contraseña" className="p-2 border rounded"
                    onChange={e => setFormData({...formData, re_password: e.target.value})}
                    required
                />
                <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                    Registrarse
                </button>
            </form>
        </div>
    );
}