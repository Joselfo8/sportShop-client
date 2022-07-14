import { title } from "process";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/action";

export default function EditProduct(){
    const dispatch = useDispatch();
    const product = useSelector((state:any) => state.products);
    const [misProductos, setMisProductos ]: any= useState({
        id: 1,
        title: "",
        price: '',
        description: "",
        category: "",
        subCategory: "",
        product_care: "",
        image: "",
        rating: '',
        rating_count: ''
    }
    );
    useEffect(() =>{
        dispatch(getProducts())
    }, []);
    useEffect(() =>{
        setMisProductos(product[0])
    }, [product]);
    const handleChange = (e:any) => {
        e.preventDefault();
        setMisProductos({title: e.target.value})
    }
    return(
        <div style={{display:"flex", justifyContent:"center"}}>
            <form>
                {misProductos ?
                    <input value={misProductos?.title} onChange={handleChange}/>
                    : null
                }
            </form>
        </div>
    )
}