import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/action";
import CardList from "./CardList";

export default function List(){
    const dispatch = useDispatch();
    const allProducts = useSelector((state:any) => state.products);
    useEffect(() => {
        dispatch(getProducts());
    },[]);
    return(
        <div>

            {
                allProducts.map((e:any) => {
                    return <CardList />
                })
            }

        </div>
    );
};