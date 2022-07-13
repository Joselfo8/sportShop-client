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
    const state = useSelector((state:any) => state.products);
    const [value, setValue] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropDown, setDropDown]: any = useState({
        FEMALE: false,
        MALE: false,
        KIDS: false,
        SPORT: false
    });

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

    const setCategoriesFalse = () => { 
        setDropDown(() => {
            return {
                "FEMALE": false,
                "MALE": false,
                "KIDS": false,
                "SPORT": false            
            }
        })
        
    }

    return (
        <div className={styles.navBar}>

            <Link to='/'>
                <img src={logo} className={styles.logo}/>
            </Link>

            <ul className={styles.navItems}>
                <li className={styles.cName} 
                    onMouseEnter={() => setDropDown(() => {
                            return {
                                ...dropDown,
                                MALE: true
                            }
                        })
                    }
                    onMouseLeave={() => setCategoriesFalse()}
                    >

                    <Link to="/MALE">
                        <button className={styles.buttonNav}>MEN</button>
                    </Link>
                    {dropDown.MALE && <DropDown categoryClick={"MALE"}/>}

                </li>

                <li className={styles.cName} 
                
                // onMouseEnter={() => setDropDown({
                //     "FEMALE": true,
                //     "MALE": false,
                //     "KIDS": false,
                //     "SPORT": false
                // })} onMouseLeave={() => setDropDown({
                //     "FEMALE": false,
                //     "MALE": false,
                //     "KIDS": false,
                //     "SPORT": false
                // })}
                
                onMouseEnter={() => setDropDown(() => {
                    return {
                        ...dropDown,
                        FEMALE: true
                    }
                })
                }
                onMouseLeave={() => setCategoriesFalse()}
                >

                <Link to="/FEMALE">
                    <button className={styles.buttonNav}>WOMEN</button>
                </Link>
                {dropDown.FEMALE && <DropDown categoryClick={"FEMALE"}/>}
                </li>

                <li 
                    className={styles.cName} 
                    onMouseEnter={() => setDropDown({ KIDS: true })} 
                    onMouseLeave={() => setDropDown({ KIDS: false })}
                >

                <Link to="/KIDS">
                    <button className={styles.buttonNav}>KIDS</button>
                </Link>
                {dropDown.KIDS && <DropDown categoryClick={"KIDS"}/>}
                </li>

                <li className={styles.cName} onMouseEnter={() => setDropDown({
                    "SPORT": true
                })} onMouseLeave={() => setDropDown({
                    "SPORT": false
                })}>
                <Link to="/SPORT">
                    <button className={styles.buttonNav}>SPORT</button>
                </Link>
                {dropDown.SPORT && <DropDown categoryClick={"SPORT"}/>}
                </li>
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

                <a href="http://localhost:3000/user/profile">User_1</a>

            </div>

        </div>
    );
};