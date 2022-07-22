import React, { useState } from "react";
import NavBar from "../../Navbar/Navbar";
import ListProduct from "../List/ListProduct";
import ListUser from "../List/ListUser";
import OrderList from "../List/OrderList";
import "./HomeAdmin.css";
import { useSelector } from "react-redux";

export default function(){
    const isAdmin = useSelector((state:any) => state.auth.auth.user.role);
    if(isAdmin !== "admin"){
        alert(`You are not a Admin`);
        return (<></>)
    };
    const [getState, setState] = useState<Number>(0);

    function handleClik(e: any){
        setState(e);
    };

    return(
        <div className="HomeAdmin">
            <NavBar />

            <div className="containerButtons">

                {   getState === 1 ?
                    <button onClick={() => {handleClik(0)}} className="selected"> Products admin</button> :
                    <button onClick={() => {handleClik(1)}}> Products admin</button>
                }
                {   getState === 2 ?
                    <button onClick={() => {handleClik(0)}}className="selected">Users admin</button> :
                    <button onClick={() => {handleClik(2)}}>Users admin</button>
                }
                {   getState === 3 ?
                    <button onClick={() => {handleClik(0)}} className="selected">Purchases admin</button> :
                    <button onClick={() => {handleClik(3)}} >Purchases admin</button>
                }

            </div>

            {
                getState === 1 ? <ListProduct/> :null
            }
            {
                getState === 2 ? <ListUser/> :null
            }
            {
                getState === 3 ? <OrderList/> :null
            }

        </div>
    );
};