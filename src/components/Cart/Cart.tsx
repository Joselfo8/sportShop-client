import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import deleteB from "../../assets/delete.png";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProductShop, getShoppingListByUserId } from "../../redux/action";

export default function Cart(){
    const dispatch = useDispatch();
    const state = useSelector((store:any) => {
        return {
            products: store.rootReducer.shoppinglist,
            userId: store.auth.auth.user.id,
        };
    });
    useEffect(() => {
        dispatch(getShoppingListByUserId(state.userId));
    },[]);
    let price: number = 0;
    let priceTotal:any = state.products ? state.products.map((e: any) => price = price + e.price) : 0;
    const deleteProduct = (idUser:number, idProduct:number) =>{
        dispatch(deleteProductShop(idUser, idProduct));
    };
    return (
        <div className={styles.bodyCart}>
            <NavBar />

            <form>

            <div className={styles.centralice}>

                <div>
                { state.products ?
                    state.products.map((e: any,index:any) =>{
                        return(
                            <div key={index} className={styles.half1}>
                                <img src={e.image} alt="Not found" style={{width:"100px", height:"100px"}}/>
                                <div className={styles.info}>
                                    <div>BRAND: none</div>
                                    <div>TITLE: {e.title}</div>
                                    <div>SIZE: none</div>
                                    <select style={{width:"5rem"}}>
                                        <option>1</option>
                                    </select>
                                </div>
                                <div className={styles.info2}>
                                    <div>PRICE:{e.price}</div>
                                    <img src={deleteB} className={styles.buttonDelete} onClick={() => {deleteProduct(state.userId, e.productId) } }/>
                                </div>
                            </div>
                        )
                    })
                    : <></>
                }
                </div>

                <div className={styles.half2}>
                    <div>PRICE:</div>
                    <div>TOTAL: {price}</div>
                    <Link to="/" style={{width:"100%"}}>
                        <button className={styles.buttonCart}>CONTINUE SHOPPING</button>
                    </Link>
                    <Link to="/purchase" style={{width:"100%"}}>
                        <button className={styles.buttonBuy}>BUY</button>
                    </Link>
                </div>
            </div>

            </form>

        </div>
    );
};
