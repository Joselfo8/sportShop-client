import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/Navbar";

export default function(){
    return(
        <div>
            <NavBar />
            <h1>Woman</h1>
            <Link to='/shoes'>
                <button>Shoes</button>
            </Link>
            <Link to='/clothing'>
                <button>Clothing</button>
            </Link>
            <Link to='/accesories'>
                <button>Accesories</button>
            </Link>
        </div>
    );
};