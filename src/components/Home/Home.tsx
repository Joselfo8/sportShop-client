import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/action';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import NavBar from '../Navbar/Navbar';
import Products from '../Products/Products';

export default function Home(){
    const dispatch = useDispatch();
    const allProducts = useSelector( (state: any) => state.products);

    useEffect(() => {
        dispatch(getProducts())
    },[dispatch]);

    return (
        <div>
            <NavBar />
            <Products/>
            <Footer />
        </div>
    );
};