import React, { useEffect, useState } from "react";
import NavBar from "../../Navbar/Navbar";
import ListProduct from "../List/ListProduct";
import ListUser from "../List/ListUser";
import OrderList from "../List/OrderList";
import styles from './HomeAdmin.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { isAdmin } from "redux/action/admin";
import { Link } from "react-router-dom";

export default function(){
    const dispatch = useDispatch();
    const token = useSelector((state:any) => state.auth.token);

    useEffect(() => {
        dispatch(isAdmin(token))
    }, [token]);
    const admin : boolean = useSelector((state : any) => state.admin.isAdmin);
    const [getState, setState] = useState<Number>(0);

    function handleClik(e: any){
        setState(e);
    };
    if(admin){
        return(
            <div className={styles.HomeAdmin}>
                <NavBar />

                <div className={styles.containerButtons}>

                    {   getState === 1 ?
                        <button onClick={() => {handleClik(0)}} className="selected"> Products</button> :
                        <button onClick={() => {handleClik(1)}}> Products</button>
                    }
                    {   getState === 2 ?
                        <button onClick={() => {handleClik(0)}}className="selected">Users</button> :
                        <button onClick={() => {handleClik(2)}}>Users</button>
                    }
                    {   getState === 3 ?
                        <button onClick={() => {handleClik(0)}} className="selected">Purchases</button> :
                        <button onClick={() => {handleClik(3)}} >Purchases</button>
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
    }else{
        return (
            <div className={styles.notAdmin}>
              <h1>You are not admin</h1>
              <Link to='/'>
                  <button>« Back home</button>
              </Link>
             </div>)
    }
};