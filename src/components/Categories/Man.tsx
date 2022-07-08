import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsMen } from "../../redux/action";
import Card from "../Card/Card";
import NavBar from "../Navbar/Navbar";

export default function(){
    const dispatch = useDispatch();
    const productsMen = useSelector((state: any) => state.productsFiltered);

    useEffect(() => {
        dispatch(getProductsMen())
    },[]);

    return(
        <div>
            <NavBar />
            <h1>Man</h1>
            {/* {
                productsMen.map((e : any) =>{
                    return <Card title={e.title}/>
                })
            } */}


{/*         <Link to='/shoes'>
                <button>Shoes</button>
            </Link>
            <Link to='/clothing/man'>
                <button>Clothing</button>
            </Link>
            <Link to='/accesories'>
                <button>Accesories</button>
            </Link> */}
        </div>
    );
};