import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/action";
import { Link } from "react-router-dom";

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
            <div>
                <input/>
                {   allProducts &&
                    allProducts.map((e:any) => {
                        return <CardList title={e.title} id={e.id} category={e.category} image={e.image}/>
                    })
                }
            </div>

            <div>
                <div className={styles.order}>
                    <b>Order No. 217778232</b>
                    <p>State: Order delivered</p>
                    <Link to="/admin/orders" style={{textDecoration:"none"}}>
                        <button className={styles.button}>View detail</button>
                    </Link>
                </div>
            </div>

            
        </div>
    );
};