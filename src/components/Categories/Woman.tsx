import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  } from "../../redux/action";
import Card from "../Card/Card";
import NavBar from "../Navbar/Navbar";

export default function(){
    const dispatch = useDispatch();
    const productsWomen = useSelector((state : any) => state.productsFiltered);

    useEffect(() => {
    }, [])

    return(
        <div>
            <NavBar />
            <h1>Woman</h1>

            {/* {
                productsWomen.map((e : any) => {
                    return <Card title={e.title}/>
                })
            } */}
{/*             <Link to='/shoes'>
                <button>Shoes</button>
            </Link>
            <Link to='/clothing'>
                <button>Clothing</button>
            </Link>
            <Link to='/accesories'>
                <button>Accesories</button>
            </Link> */}
        </div>
    );
};