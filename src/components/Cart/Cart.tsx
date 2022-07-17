import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import deleteB from "../../assets/delete.png";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getShoppingListByUserId } from "../../redux/action";

export default function Cart(){
    const dispatch = useDispatch();
    const state = useSelector((store:any) => {
        return {
            products: store.rootReducer.shoppinglist ? store.rootReducer.shoppinglist : [],
            userId: store.auth.auth.user.id,
        };
    });
    useEffect(() => {
        dispatch(getShoppingListByUserId(state.userId));
    },[]);
    const [productCart, setProductCart] = useState(state.products);
    let priceCart: number = 0;
    state.products.map((e: any) => priceCart = priceCart + e.price);

    const deleteProduct = (e:any) =>{
        setProductCart(
            productCart.filter((product: any) => product.id !== e )
        );
    };
    console.log(state.userId)
    return (
        <div className={styles.bodyCart}>
            <NavBar />

            <form>

            <div className={styles.centralice}>

                <div>
                {
                    productCart.map((e: any,index:any) =>{
                        return(
                            <div key={index} className={styles.half1}>
                                <img src={e.image} alt="Not found" style={{width:"100px", height:"100px"}}/>
                                <div className={styles.info}>
                                    <div>BRAND:</div>
                                    <div>TITLE: {e.title}</div>
                                    <div>SIZE: {}</div>
                                    <select>
                                        <option>1</option>
                                    </select>
                                </div>
                                <div className={styles.info2}>
                                    <div>PRICE:{e.price}</div>
                                    <img src={deleteB} className={styles.buttonDelete} onClick={() => {deleteProduct(e.id)} }/>
                                </div>
                            </div>
                        )
                    })
                }
                </div>

                <div className={styles.half2}>
                    <div>PRICE:</div>
                    <div>TOTAL: {priceCart}</div>
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
    )
}
