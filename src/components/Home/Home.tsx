import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../../redux/action';
import Card from '../Card/Card';

export default function Home(){
    const dispatch = useDispatch();
    const allProducts = useSelector( (state: any) => state.products)
    useEffect(() => {
        dispatch(getProducts())
    });
    return (
        <div>
            {
                allProducts.map((e: any) => {
                    return <Card title={e.title}/>
                })
            }
        </div>
    );
};