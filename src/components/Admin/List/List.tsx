import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "./CardList";

export default function List(){
    const dispatch = useDispatch();
    const allProducts = useSelector((state:any) => state.products);

    return(
        <div>
            {
                allProducts.map((e:any) => {
                    return <CardList />
                })
            }

        </div>
    )
}