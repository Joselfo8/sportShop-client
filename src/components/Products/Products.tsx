import { useState, useEffect } from "react";
// import { getAllJSDocTagsOfKind } from "typescript";
// Store
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action";
// Components
import Card from "../Card/Card";
import Pagination from "../Pagination";
// import NavBar from "../Navbar/Navbar";
import style from "./Products.module.scss";

export default function Products() {
    // save user click pagination button
    const [selected, setSelected] = useState(1);
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state);

    // get products from store
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const render = {
        allProducts:
            state.products.length === 0 ? (
                <div>
                    <h2>Loading products</h2>
                </div>
            ) : (
                state.products.map((p: any) => {
                    return (
                        <Card
                            key={p.title}
                            id={p.id}
                            image={p.image}
                            title={p.title}
                            price={p.price}
                        />
                    );
                })
            ),

        searchProducts:
            state.productsFiltered.length === 0 ? (
                <div>
                    <h2>No products found!</h2>
                </div>
            ) : (
                state.productsFiltered.map((p: any) => {
                    return (
                        <Card
                            key={p.title}
                            id={p.id}
                            image={p.image}
                            title={p.title}
                            price={p.price}
                        />
                    );
                })
            ),
    };

    return (
        <div className={style.cardContainer}>
            {state.productsFiltered.length === 0
                ? render.allProducts
                : render.searchProducts}
            <Pagination
                maxPage={state.products.length}
                next={{ limit: 10, page: 2 }}
                previous={{ limit: 10, page: 1 }}
                selected={selected}
                onSelected={setSelected}
            />
        </div>
    );
}
