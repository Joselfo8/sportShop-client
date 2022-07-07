import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { cleanStore, getProducts, getProductsByName } from '../../redux/action';
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

            <Link to='/man'>
                <button onClick={resetStore}>Man</button>
            </Link>

            <Link to='/woman'>
                <button onClick={resetStore}>Woman</button>
            </Link>

            <button>Kids</button>

            <button>Sport</button>

            <Link to='/cart'>
                <button>Cart</button>
            </Link>

        </div>
    );
};