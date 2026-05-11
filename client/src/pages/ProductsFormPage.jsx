import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProducts, deleteProducts, updateProducts, getProduct } from '../api/products.api'
import {useNavigate, useParams} from 'react-router-dom'

export function ProductsFormPage(){
    const {register, handleSubmit, formState:{errors},
        setValue
        } = useForm();
    const navigate = useNavigate()
    const params = useParams()


    const onSubmit = handleSubmit(async data =>{
        if (params.id) {
            console.log("Actualizando")
            await updateProducts(params.id, data)

        } else {
        await createProducts(data)
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
        <div> Products Form Page

            <hr></hr>
            <form onSubmit={onSubmit}>
                <input  type="text" placeholder="name" {...register("name", {required:true})}   />
                {errors.name && <span>Name is required</span>}
                <textarea rows={3} placeholder="Description"  {...register("description", {required:true})} 
                 ></textarea>
                {errors.description && <span>Description is required</span>}

                <button>Save</button>
                {params.id && <button onClick={async()=>{ const accepted = window.confirm("Are you sure?");
                    if (accepted){
                        await deleteProducts(params.id);
                        navigate("/products");
                    }
                }}> Delete</button>}

            </form>
        </div>
    )
}
