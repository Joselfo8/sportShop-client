import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Navbar/Navbar";
import CardList from "./CardList";

export default function(){
    const dispatch = useDispatch();
    const allProducts = useSelector((state:any) => state.products);

    return(
        <div>
            <NavBar/>

            {
                allProducts.map((e:any) => {
                    return <CardList />
                })
            }

        </div>
    )
}