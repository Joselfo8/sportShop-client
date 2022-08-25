import Card from "components/Card/Card";
import Filter from "components/Filter/Filter";
import Footer from "components/Footer/Footer";
import NavBar from "components/Navbar/Navbar";
import Pagination from "components/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { allProducts } from "redux/action/products";
import styles from "./Product.module.scss"

export default function(){
    const dispatch = useDispatch();
    const location = useLocation();
    const state = useSelector((state : any) => state.products.products);
    const [page, setPage] = useState(1);
    let where = location.pathname.split("/");
    let order = location.search.slice(1)
    let title = where[1] === "search" ? where[2] : '';
    useEffect(() => {
        dispatch(allProducts(where[1], where[2], page, order, title));
    },[page, location]);
    return(
        <div>
            <NavBar />
            <Filter/>
            <div className={styles.container}>

            { state.products && state.products.length ?
                <></> :
                <h1>Products not found...</h1>
            }
            {
                state.products?.map((p:any) => {
                    return <Card
                    key={p.title}
                    id={p.id}
                    image={p.image}
                    title={p.title}
                    category={p.category}
                    price={p.price}
                    />
                })
            }
            </div>
            { state.products && state.products.length ?
            <div className={styles.pagination}>
                <Pagination
                    maxPage={state.maxPage}
                    next={state.next}
                    previous={state.previous}
                    selected={page}
                    onSelected={setPage}
                />
            </div>
            :   <></>
            }
            <Footer/>
        </div>
    );
};