import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/action';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Footer from '../Footer/Footer';
import NavBar from '../Navbar/Navbar';
import Products from '../Products/Products';

import styles from '../Filter/Filter.module.scss'

export default function Home(){
    const dispatch = useDispatch();
    const allProducts = useSelector( (state: any) => state.products);

    useEffect(() => {
        dispatch(getProducts())
    },[dispatch]);

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <Filter/>
            </div>
            <Products/>
            <Footer />
        </div>
    );
};