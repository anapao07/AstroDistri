import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import logoImg from '../assets/astroLogo.svg'; 

export function Navigation() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme !== 'light';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className={`px-6 py-4 border-b shadow-xl transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a] border-zinc-800' : 'bg-white border-gray-200'}`}> 
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                <Link to="/products" className="flex items-center gap-3 group">
                    <img 
                        src={logoImg} 
                        alt="AstroDistri Logo" 
                        className={`h-20 w-auto object-contain transition-opacity ${isDarkMode ? 'group-hover:opacity-20' : 'filter invert group-hover:opacity-50'}`} 
                    />
                </Link>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle Button */}
                    <button 
                        onClick={toggleTheme} 
                        className={`p-2 rounded-lg font-medium transition-all text-sm flex items-center justify-center
                            ${isDarkMode 
                                ? 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800' 
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? '🌞 Light' : '🌙 Dark'}
                    </button>

                    {user && (
                        <Link to="/products-create" className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm'>
                            + Create Product
                        </Link>
                    )}
                    {user ? (
                        <button onClick={handleLogout} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all
                            ${isDarkMode 
                                ? 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800' 
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
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