import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { 
    createProducts, 
    deleteProducts, 
    updateProducts, 
    getProduct, 
    getAllStatuss 
} from '../api/products.api'


import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-hot-toast"

export function ProductsFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();
    
   
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        async function loadStatuses() {
            try {
                const res = await getAllStatuss();
                setStatuses(res.data);
            } catch (error) {
                console.error("Error al cargar estados", error);
                toast.error("Error al cargar los estados");
            }
        }
        loadStatuses();
    }, []);

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateProducts(params.id, data)
            toast.success('Producto Actualizado')
        } else {
            await createProducts(data)
            toast.success('Producto Creado')
        }
        navigate("/products")
    })

    useEffect(() => {
        async function loadProducts() {
            if (params.id) {
                const { data: { name, description, stock, status } } = await getProduct(params.id)
                setValue('name', name);
                setValue('description', description);
                setValue('stock', stock);
                setValue('status', status);
            }
        }
        loadProducts();
    }, [params.id, setValue])

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{params.id ? 'Edit Product' : 'Create New Product'}</h1>
                <p className="text-sm mt-2 opacity-70">Fill in the product details to add it to your online store inventory.</p>
            </div>
            
            <form onSubmit={onSubmit} className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-8 rounded-xl shadow-2xl">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/*  Name */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium mb-2 opacity-90">Product Name</label>
                        <input type="text" placeholder="e.g. Wireless Noise-Cancelling Headphones" {...register("name", { required: true })}
                            className="bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-3 rounded-lg block w-full transition-colors" />
                        {errors.name && <span className="text-red-400 text-xs mt-1 block">Name is required</span>}
                    </div>

                    {/*  Stock */}
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-90">Inventory Stock</label>
                        <div className="relative">
                            <input type="number" placeholder="0" min="0" {...register("stock", { required: true })}
                                className="bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-3 pl-10 rounded-lg block w-full transition-colors" />
                            <span className="absolute left-3 top-3.5 text-zinc-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </span>
                        </div>
                        {errors.stock && <span className="text-red-400 text-xs mt-1 block">Stock is required</span>}
                    </div>

                    {/* --- SELECT DE STATUS --- */}
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-90">Product Status</label>
                        <div className="relative">
                            <select 
                                {...register("status", { required: true })} 
                                className="bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-3 rounded-lg block w-full text-white appearance-none transition-colors"
                            >
                                <option value="" disabled>Select status</option>
                                {statuses.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute right-3 top-3.5 pointer-events-none text-zinc-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                        {errors.status && <span className="text-red-400 text-xs mt-1 block">Status is required</span>}
                    </div>
                </div>

                {/*  Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 opacity-90">Product Description</label>
                    <textarea rows={4} placeholder="Describe the product features, specifications, and benefits..." {...register("description", { required: true })}
                        className="bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-3 rounded-lg block w-full transition-colors resize-none"></textarea>
                    {errors.description && <span className="text-red-400 text-xs mt-1 block">Description is required</span>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-zinc-700/50">
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {params.id ? 'Update Product' : 'Save Product'}
                    </button>

                    {params.id && (
                        <button 
                            type="button" 
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 font-semibold py-3 px-6 rounded-lg transition-colors flex justify-center items-center gap-2"
                            onClick={async () => {
                                const accepted = window.confirm("Are you sure you want to delete this product?");
                                if (accepted) {
                                    await deleteProducts(params.id);
                                    toast.success('Producto Eliminado')
                                    navigate("/products");
                                }
                            }}> 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}