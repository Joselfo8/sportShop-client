import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductsByName } from "../../../redux/action";
import styles from "./List.module.scss"
import CardList from "./CardList";

export default function ListProduct(){
    const dispatch = useDispatch();
    const state = useSelector((state:any) => state);
    const [ value, setValue ] = useState('');
    const typeList = 'PRODUCT';
    useEffect(() => {
        dispatch(getProducts());
    },[]);
    function handleChange(event: any) {
        setValue(event);
    };
    function handleSubmit(event: any) {
        event.preventDefault();
        dispatch(getProductsByName(value));
    };
    return(
        <div className={styles.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                name="search"
                type="text"
                placeholder="Search"
                id="searchProducts"
                onChange={(e) => handleChange(e.target.value)}
                />
            </form>
            {
                state.productsFiltered.length === 0 ?
                state.products.map((e:any) => {
                    return <CardList title={e.title} id={e.id} category={e.category} image={e.image} type={typeList}/>}) :
                state.productsFiltered.map((e:any) => {
                    return <CardList title={e.title} id={e.id} category={e.category} image={e.image} type={typeList}/>})
            }

        </div>
    );
};