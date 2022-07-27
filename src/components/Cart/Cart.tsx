import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import deleteB from "../../assets/delete.png";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProductShop, getShoppingListByUserId } from "../../redux/action";
import styled from 'styled-components'
import { toast } from "react-toastify";
export default function Cart(){
    const dispatch = useDispatch();
    const state = useSelector((store:any) => {
        return {
            products: store.rootReducer.shoppinglist.list,
            userInfo: store.rootReducer.userInformation.shippingAddresses
        };
    });
    useEffect(() => {
        dispatch(getShoppingListByUserId());
    },[]);
    let amountProduct : any = state.products && state.products.length
    ?
    state.products.map((e : any) => (Object.values(e.sizesAmount).map((e) => Number(e)).reduce((e : any, d : any) => e + d) * e.price)).reduce((z : number, y : number) => z + y)
    : 0;
    const deleteProduct = (pId : number) =>{
        dispatch(deleteProductShop(pId));
    };
    const handleAdress = () => {
        let cant = "You need create address";
        if(!state.userInfo.length) return toast(cant)
    }
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
                                    <div>TITLE: {e.title}</div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <Th>
                                                    SIZE
                                                </Th>
                                                <Th>
                                                    AMOUNT
                                                </Th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {Object.keys(e.sizesAmount).map((key: any,index:any) => <Div key={index}>{key}</Div>)}
                                                </td>
                                                <td>
                                                    {Object.values(e.sizesAmount).map((key: any,index) => <Div key={index}>{key}</Div>)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.info2}>
                                    <div>PRICE:{e.price}</div>
                                    <img src={deleteB} className={styles.buttonDelete} onClick={() => {deleteProduct(e.Product_id) } }/>
                                </div>
                            </div>
                        )
                    })
                    : <></>
                }
                </div>

                <div className={styles.half2}>
                    <div>PRICE:</div>
                    <div>TOTAL: {amountProduct}</div>
                    <Link to="/" style={{width:"100%"}}>
                        <button className={styles.buttonCart}>CONTINUE SHOPPING</button>
                    </Link>
                    <Link to={state.userInfo.length ? "/purchase" : "/user/profile"} style={{width:"100%"}}>
                        <button className={styles.buttonBuy} onClick={handleAdress}>BUY</button>
                    </Link>
                </div>
            </div>

            </form>

        </div>
    );
};

const Div = styled.div`
text-align: center;
border: 1px solid lightgrey;
`

const Th = styled.th`
text-align: center;

`