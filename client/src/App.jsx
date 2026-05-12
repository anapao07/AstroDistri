import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { ProductsFormPage } from './pages/ProductsFormPage';
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";
import { Footer } from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">

        <Navigation />
        <main className="flex-grow container mx-auto px-4 pt-10 pb-20">
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products-create" element={<ProductsFormPage />} />
            <Route path="/products/:id" element={<ProductsFormPage />} />
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Routes>
          <Toaster />
        </main>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;