import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Navbar/Navbar";
import "./HomeAdmin.css"
import ListProducts from "./ListProducts";


export default function(){
    const [getState,setState]=useState({
        products:[],
        on:true
    });
    
     function handleClik(){
        setState({
            ...getState,
            on:!getState.on
        })
    }

    return(
        <div className="HomeAdmin">
            <NavBar />

            <div className="containerButtons">
                {getState.on?<button onClick={handleClik} className="selected"> Administrar Productos</button>:<button onClick={handleClik} > Administrar Productos</button>}
                
                <button>Administrar Usuarios</button>
                <button>Administrar Compras</button>
            </div>
            {
                getState.on?<ListProducts/>:null
        
            }
            
            
        </div>
    )
}