import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/action";
import styles from "./List.module.scss"
import CardList from "./CardList";

export default function ListProduct(){
    const dispatch = useDispatch();
    const allProducts = useSelector((state:any) => state.products);
    useEffect(() => {
        dispatch(getProducts());
    },[]);
    return(
        <div className={styles.container}>
            <input/>
            {   allProducts &&
                allProducts.map((e:any) => {
                    return <CardList title={e.title} id={e.id} category={e.category} image={e.image}/>
                })
            }
        </div>
    );
};