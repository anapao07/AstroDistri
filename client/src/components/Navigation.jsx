import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import logoImg from '../assets/astroLogo.svg'; 

export function Navigation() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className="px-6 py-4 bg-[#0a0a0a] border-b border-zinc-800 shadow-xl"> 
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                <Link to="/products" className="flex items-center gap-3 group">
                    <img 
                        src={logoImg} 
                        alt="AstroDistri Logo" 
                        className="h-20 w-auto object-contain group-hover:opacity-20 transition-opacity" 
                    />
                    
                   
                </Link>

                <div className="flex items-center gap-4">
                    {user && (
                        <Link to="/products-create" className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm'>
                            + Create Product
                        </Link>
                    )}
                    {user ? (
                        <button onClick={handleLogout} className='border border-zinc-700 text-zinc-300 px-4 py-2 rounded-lg font-medium hover:bg-zinc-800 text-sm'>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm'>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}