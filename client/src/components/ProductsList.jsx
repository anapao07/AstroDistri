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
        <div> 
           
            {products.map((product) =>(
                <ProductsCard key={product.id} product={product} />
            ))}
          
        </div>
    );
}