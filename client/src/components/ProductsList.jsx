import { useEffect, useState } from "react";
import { getAllProducts } from '../api/products.api';
import { ProductsCard } from './ProductsCard';

export function ProductsList() {
    //  Inicializar  array vacío para evitar errores de .map()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const res = await getAllProducts(); 
            setProducts(res.data || []); 
        }
        loadProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Inventario de Productos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                {products.map((product) =>(
                    <ProductsCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}