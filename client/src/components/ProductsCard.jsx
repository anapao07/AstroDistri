import { useNavigate } from "react-router-dom"

export function ProductsCard({product}){
    
    const navigate = useNavigate()

    return (
        <div 
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-200 cursor-pointer"
            onClick={() =>{
                navigate(`/products/${product.id}`)
            }}
        >
            <h1 className="font-bold text-lg text-gray-900 uppercase mb-2">{product.name}</h1>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Stock: {product.stock}</span>
            </div>
        </div>
    )
}