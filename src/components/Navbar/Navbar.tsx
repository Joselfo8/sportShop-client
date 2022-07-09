import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { cleanStore, getProducts, getProductsByName, getProductsByCategory } from '../../redux/action';
import styles from './NavBar.module.scss';
import cart from '../../assets/cart.png';
import user from '../../assets/user.png';
import heart from '../../assets/corazonVacio.png'

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

    function productCategory(event: any) {
        dispatch(getProductsByCategory(event.target.value));
    }


    return (
        <div className={styles.navBar}>

            <Link to='/home'>
                <img src={logo} className={styles.logo}/>
            </Link>


            <div>
                <button onClick={(e) => {return productCategory(e)}} value='MALE'>Man</button>

                <button onClick={(e) => {return productCategory(e)}} value='FEMALE'>Woman</button>

                <button onClick={(e) => {return resetStore(e)}}>All products</button>
            </div>

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

           
            <div>
                <Link to='/login'>
                    <img src={user} className={styles.cart}/>
                </Link>
                <Link to='favorites'>
                    <img src={heart} className={styles.heart}/>
                </Link>
                <Link to='/cart'>
                    <img src={cart} className={styles.cart}/>
                </Link>
            </div>

        </div>
    );
};