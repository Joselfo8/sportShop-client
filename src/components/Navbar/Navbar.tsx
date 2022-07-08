import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { cleanStore, getProducts, getProductsByName, getProductsWomen, getProductsMen } from '../../redux/action';
import styles from './NavBar.module.css';

export default function NavBar(){
    const [value, setValue] = useState({})
    const dispatch = useDispatch()

    const allState = useSelector((state) => state)

    function handleChange(event: any) {
        setValue(event)
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        dispatch(getProductsByName(value))
    }

    function resetStore(event : any){
        dispatch(cleanStore(event))
    }

    function womenProducts(event: any) {
        dispatch(getProductsWomen());
    }

    function menProducts(event: any) {
        dispatch(getProductsMen());
    }

    console.log(allState)

    return (
        <div>
            <img src={logo}/>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    name="searchProducts"
                    id="searchProducts"
                    placeholder='Search by products...'
                    onChange={(e) => handleChange(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <button onClick={(e) => {return menProducts(e)}}>Man</button>

            <button onClick={(e) => {return womenProducts(e)}}>Woman</button>

            <button onClick={(e) => {return resetStore(e)}}>All products</button>
            
            <Link to='/cart'>
                <button>Cart</button>
            </Link>

        </div>
    );
};