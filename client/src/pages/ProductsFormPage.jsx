import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProducts, deleteProducts, updateProducts, getProduct } from '../api/products.api'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from "react-hot-toast"


export function ProductsFormPage(){
    const {
        register, 
        handleSubmit, formState:{errors},
        setValue
        } = useForm();
    const navigate = useNavigate()
    const params = useParams()


    const onSubmit = handleSubmit(async data =>{
        if (params.id) {
            console.log("Actualizando")
            await updateProducts(params.id, data)
            toast.success('Producto Actualizado')


        } else {
        await createProducts(data)
        toast.success('Producto Creado')
        }
        navigate("/products")

    })

    useEffect(()=>{
        async function loadProducts() {
                    if(params.id){
            console.log("Get data");
            const {data: {name, description}} = await getProduct(params.id)            
            setValue('name', name);
            setValue('description', description);

        }
        }
        loadProducts();

    }, [])

    return (
        <div className="max-w-wl mx-auto"> 
            <hr></hr>
            <form onSubmit={onSubmit}  className="bg-zinc-800 p-10 rounded-lg mt-2">

                <input  type="text" placeholder="name" {...register("name", {required:true})}  
                className="bg-zinc-700 p-3 rounded-lg block  w-full mb-5" />

                {errors.name && <span>Name is required</span>}

                <textarea rows={3} placeholder="Description"  {...register("description", {required:true})} 
                className="bg-zinc-700 p-3 rounded-lg block  w-full mb-5"></textarea>
                {errors.description && <span>Description is required</span>}

                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>

                {params.id && 
                <div className="flex justify-end">
                <button className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                    onClick={async()=>{ const accepted = window.confirm("Are you sure?");''
                    if (accepted){
                        await deleteProducts(params.id);
                        toast.success('Producto Eliminado')

                        navigate("/products");
                    }
                }}> Delete</button>
                </div>
                }

            </form>
        </div>
    )
}
