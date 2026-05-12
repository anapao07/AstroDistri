import {Link} from 'react-router-dom'
import { Footer } from './footer'

export function Navigation () {
    return (
        <div className="px-4 py-4"> 
            <Link to="/products">
                <h1 className='font-bold text-3xl mb-4 text-center'>Products App</h1>
            </Link>
            
            <div className="flex justify-center">
                <button className='bg-indigo-500 px-3 py-2 rounded-lg'>
                    <Link to="/products-create" className="text-white">create products</Link>
                </button>
            </div>
        </div>
        
    )
}

