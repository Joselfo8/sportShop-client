import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { cleanStore, getProductsByName, getProductsByCategory, getProducts } from '../../redux/action';
import styles from './NavBar.module.scss';
import cart from '../../assets/cart.png';
import user from '../../assets/user.png';
import lens from '../../assets/lupa.png'
import heart from '../../assets/corazonVacio.png'
import DropDown from './DropDown';

export default function NavBar(){
    const products = useSelector((state:any) => state.products);
    const [value, setValue] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropDown, setDropDown]: any = useState({
        FEMALE: false,
        MALE: false,
        KIDS: false,
        SPORT: false
    });
    let data = products.map((e:any) => { return e.category});
    let result = data.filter((item:any,index:any)=>{
        return data.indexOf(item) === index;
    })
    useEffect(() => {
        dispatch(getProducts())
    },[])

    function handleChange(event: any) {
        setValue(event);
    };

    function handleSubmit(event: any) {
        event.preventDefault();
        dispatch(getProductsByName(value));
        navigate('/products');
    };
    return (
        <div className={styles.navBar}>

            <Link to='/'>
                <img src={logo} className={styles.logo}/>
            </Link>

            <ul className={styles.navItems}>
            {
                result.map((e:any) => {
                    return(
                        <li className={styles.cName}
                        onMouseEnter={() => setDropDown({[e]:true})}
                        onMouseLeave={() => setDropDown({[e]:false})}
                        key={e}
                        >
                        <Link to={`/${e}`}>
                            <button className={styles.buttonNav}>{e}</button>
                        </Link>
                        {dropDown[e] && <DropDown categoryClick={e}/>}
                        </li>
                    )
                })
            }
            </ul>

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

            </div>

        </div>
    );
};