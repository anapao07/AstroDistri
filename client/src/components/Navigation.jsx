import {Link} from 'react-router-dom'

export function Navigation () {
    return (
        <div>
            <Link to="/products"><h1>Products App</h1></Link>
            <Link to="/products-create">create prducts</Link>
    
        </div>
    )
}
