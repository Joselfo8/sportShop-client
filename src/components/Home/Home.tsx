import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/action';
import Card from '../Card/Card';
import NavBar from '../Navbar/Navbar';

export default function Home(){
    const dispatch = useDispatch();
    const allProducts = useSelector( (state: any) => state.products);

    useEffect(() => {
        dispatch(getProducts())
    },[dispatch]);

    return (
        <div>
            <NavBar />
            {
                allProducts.map((e: any) => {
                    return <Card title={e.title} key={e.title}/>
                })
            }
        </div>
    );
};