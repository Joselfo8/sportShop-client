// import React, {useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '../../redux/action';

// Components
import NavBar from '../Navbar/Navbar';
import Categories from '../Categories/Categories';
import Footer from '../Footer/Footer';
import { Modal } from 'reactstrap';
import { useState } from 'react';

// Style




export default function Home(){
    // const dispatch = useDispatch();
    // const allProducts = useSelector( (state: any) => state.products);
    // useEffect(() => {
    //     dispatch(getProducts())
    // },[dispatch]);

    return (
        <div>
            <NavBar />

            <Categories />

            <Footer />
        </div>
    );
};