import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJSDocTagsOfKind } from 'typescript';
import { getProducts } from '../../redux/action';
import Card from '../Card/Card';
import NavBar from '../Navbar/Navbar';
import style from './Products.module.scss'

export default function Products() {

    const dispatch = useDispatch();
    const state = useSelector((state: any) => state); 

    useEffect(() => {
        dispatch(getProducts())
    },[dispatch]);

    const render = {
        allProducts: 
            state.products.length === 0
            ?   <div>
                    <h2>Loading products</h2>
                </div>
            : state.products.map((p: any) => {
                return <Card 
                            key={p.title}
                            id={p.id}
                            image={p.image}
                            title={p.title}
                            price={p.price}
                        />
            }),

        searchProducts:
            state.productsFiltered.length === 0
            ?   <div>
                    <h2>No products found!</h2>
                </div>
            : state.productsFiltered.map((p: any) => {
                return <Card 
                            key={p.title}
                            id={p.id}
                            image={p.image}
                            title={p.title}
                            price={p.price}
                        />
            })  
        }
    

    return (
        <div className={style.cardContainer}>
            {
                state.productsFiltered.length === 0 ? render.allProducts : render.searchProducts
            }
        </div>
    );
};