import { useEffect, useState } from "react";
import { getAllProducts } from '../api/products.api';
import { ProductsCard } from './ProductsCard';

export function ProductsList() {
    //  Inicializar  array vacío para evitar errores de .map()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const res = await getAllProducts(); 
                setProducts(res.data || []); 
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        }
        loadProducts();
    }, []);

    return (
        <div> 
            {products.length === 0 ? (
                <p>Cargando productos...</p>
            ) : (
                products.map(product => (
                   < ProductsCard key={product.id} product={product} />
                ))
            )}
        </div>
    );
}