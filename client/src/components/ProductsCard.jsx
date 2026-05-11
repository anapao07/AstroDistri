import { useNavigate } from "react-router-dom"

export function ProductsCard({product}){
    
    const navigate = useNavigate()

    return (
        <div style={{background:"#345678"}} 
            onClick={() =>{
                navigate(`/products/${product.id}`)
            }}
            >
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <hr></hr>

        </div>
    )
}