export function ProductsCard({product}){
    return (
        <div >
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <hr></hr>

        </div>
    )
}