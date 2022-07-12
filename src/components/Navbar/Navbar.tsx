import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { cleanStore, getProductsByName, getProductsByCategory } from '../../redux/action';
import styles from './NavBar.module.scss';
import cart from '../../assets/cart.png';
import user from '../../assets/user.png';
import lens from '../../assets/lupa.png'
import heart from '../../assets/corazonVacio.png'
import DropDown from './DropDown';

export default function NavBar(){
    const [value, setValue] = useState({});
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);
    console.log(location)

    function handleChange(event: any) {
        setValue(event);
    };

    function handleSubmit(event: any) {
        event.preventDefault();
        dispatch(getProductsByName(value));
        navigate('/products');
    };

    function resetStore(event : any){
        dispatch(cleanStore(event));
    };

    function productCategory(event: any) {
        dispatch(getProductsByCategory(event.target.value));
    };
    return (
        <div className={styles.navBar}>

            <Link to='/'>
                <img src={logo} className={styles.logo}/>
            </Link>


            <div>
                <Link to='/products' onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                    <button onClick={(e) => {return productCategory(e)}} value='MALE' className={styles.buttonNav}>MAN</button>
                </Link>
                <Link to='/products' onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                    <button onClick={(e) => {return productCategory(e)}} value='FEMALE' className={styles.buttonNav}>Woman</button>
                </Link>
                <Link to='/products' onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                    <button onClick={(e) => {return productCategory(e)}} value='KIDS' className={styles.buttonNav}>Kids</button>
                </Link>
                {
                    location.pathname === '/products' ?
                    <Link to='/products'>
                        <button onClick={(e) => {return resetStore(e)}} className={styles.buttonNav}>All Products</button>
                    </Link>
                    : <></>
                }

            </div>

            <div className={styles.orderIcons}>

                <div className={styles.bodySearch}>
                    <form onSubmit={(e) => handleSubmit(e)}>
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

                <a href="http://localhost:3000/user/profile">User_1</a>

            </div>

                <DropDown/>
        </div>
    );
};