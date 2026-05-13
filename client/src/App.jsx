import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { ProductsFormPage } from './pages/ProductsFormPage';
import { LoginPage } from './pages/LoginPage'; 
import { RegisterPage } from './pages/RegisterPage';
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";
import { Footer } from './components/footer';
import { AuthProvider } from './context/AuthContext'; 
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow container mx-auto px-4 pt-10 pb-20">
            <Routes>
              {/* --- RUTAS PÚBLICAS --- */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* --- RUTAS PROTEGIDAS --- */}
              <Route 
                path="/products" 
                element={
                  <PrivateRoute>
                    <ProductsPage />
                  </PrivateRoute>
                } 
              />

              <Route 
                path="/products-create" 
                element={
                  <PrivateRoute>
                    <ProductsFormPage />
                  </PrivateRoute>
                } 
              />

              <Route 
                path="/products/:id" 
                element={
                  <PrivateRoute>
                    <ProductsFormPage />
                  </PrivateRoute>
                } 
              />

              <Route path="/" element={<Navigate to="/products" />} />
              
              {/* 404 */}
              <Route path="*" element={<div>404 - Página no encontrada</div>} />
            </Routes>
            <Toaster />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;