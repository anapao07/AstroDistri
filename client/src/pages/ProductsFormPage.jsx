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
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {params.id ? 'Editar Producto' : 'Crear Nuevo Producto'}
                </h1>
                <p className="text-sm mt-2 text-gray-500">
                    {params.id ? 'Modifica los detalles del producto.' : 'Completa los detalles para añadir un nuevo producto al inventario.'}
                </p>
            </div>
            
            <form onSubmit={onSubmit} className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/*  Name */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Producto</label>
                        <input type="text" placeholder="Ej. Audífonos inalámbricos" {...register("name", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-xl block w-full transition-all" />
                        {errors.name && <span className="text-red-500 text-xs mt-1 block">El nombre es requerido</span>}
                    </div>

                    {/*  Stock */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Disponible</label>
                        <input type="number" placeholder="0" min="0" {...register("stock", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-xl block w-full transition-all" />
                        {errors.stock && <span className="text-red-500 text-xs mt-1 block">El stock es requerido</span>}
                    </div>

                    {/* --- SELECT DE STATUS --- */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Estado del Producto</label>
                        <select 
                            {...register("status", { required: true })} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-xl block w-full appearance-none transition-all"
                        >
                            <option value="" disabled>Seleccionar estado</option>
                            {statuses.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                        {errors.status && <span className="text-red-500 text-xs mt-1 block">El estado es requerido</span>}
                    </div>
                </div>

                {/*  Description */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                    <textarea rows={4} placeholder="Describe las características del producto..." {...register("description", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-xl block w-full transition-all resize-none"></textarea>
                    {errors.description && <span className="text-red-500 text-xs mt-1 block">La descripción es requerida</span>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2">
                        {params.id ? 'Guardar Cambios' : 'Crear Producto'}
                    </button>

                    {params.id && (
                        <button 
                            type="button" 
                            className="bg-white hover:bg-red-50 text-red-600 border border-red-200 font-semibold py-3 px-6 rounded-xl transition-all flex justify-center items-center gap-2"
                            onClick={async () => {
                                const accepted = window.confirm("¿Estás seguro de eliminar este producto?");
                                if (accepted) {
                                    await deleteProducts(params.id);
                                    toast.success('Producto Eliminado')
                                    navigate("/products");
                                }
                            }}> 
                            Eliminar
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}