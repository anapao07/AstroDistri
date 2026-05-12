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
        <div className="max-w-wl mx-auto"> 
            <hr />
            <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
                
                {/*  Name */}
                <input type="text" placeholder="name" {...register("name", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-5" />
                {errors.name && <span className="text-red-500 text-sm">Name is required</span>}

                {/*  Stock */}
                <input type="number" placeholder="stock" {...register("stock", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-5" />
                {errors.stock && <span className="text-red-500 text-sm">Stock is required</span>}

                {/* --- SELECT DE STATUS --- */}
                <select 
                    {...register("status", { required: true })} 
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-5 text-white"
                >
                    <option value="">Select status</option>
                    {statuses.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
                {errors.status && <span className="text-red-500 text-sm">Status is required</span>}

                {/*  Description */}
                <textarea rows={3} placeholder="Description" {...register("description", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-5"></textarea>
                {errors.description && <span className="text-red-500 text-sm">Description is required</span>}

                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>

                {params.id && (
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                            onClick={async () => {
                                const accepted = window.confirm("Are you sure?");
                                if (accepted) {
                                    await deleteProducts(params.id);
                                    toast.success('Producto Eliminado')
                                    navigate("/products");
                                }
                            }}> Delete</button>
                    </div>
                )}
            </form>
        </div>
    )
}