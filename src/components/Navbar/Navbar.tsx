import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { cleanStore, getProducts, getProductsByName, getProductsByCategory } from '../../redux/action';
import styles from './NavBar.module.scss';
import cart from '../../assets/cart.png';
import user from '../../assets/user.png';
import lens from '../../assets/lupa.png'
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

            <Link to='/'>
                <img src={logo} className={styles.logo}/>
            </Link>


            <div>
                <Link to='/products'>
                    <button onClick={(e) => {return productCategory(e)}} value='MALE' className={styles.buttonNav}>Man</button>
                </Link>
                <Link to='/products'>
                    <button onClick={(e) => {return productCategory(e)}} value='FEMALE' className={styles.buttonNav}>Woman</button>
                </Link>
                <Link to='/products'>
                    <button onClick={(e) => {return resetStore(e)}} className={styles.buttonNav}>All Products</button>
                </Link>
            </div>


            <div className={styles.orderIcons}>

                <div className={styles.bodySearch}>
                    <form  onSubmit={(e) => handleSubmit(e)}>
                        <input
                            className={styles.search}
                            name="search"
                            type="text"
                            placeholder="Search"
                            id="searchProducts"
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </form>
                    <img src={lens} className={styles.search_submit}/>
                </div>

                <Link to='/login'>
                    <img src={user} className={styles.cart}/>
                </Link>

                <Link to='/favorites'>
                    <img src={heart} className={styles.heart}/>
                </Link>

                <Link to='/cart'>
                    <img src={cart} className={styles.cart}/>
                </Link>

                <a href="https://sport-shop-client.vercel.app/user/profile">User_1</a>

            </div>

        </div>
    );
};