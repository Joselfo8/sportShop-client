import React, { useState } from "react";
import NavBar from "../Navbar/Navbar";
import deleteB from "../../assets/delete.png";
import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Cart(){
    const state = useSelector((state:any) => state.rootReducer.productCart);
    const [productCart, setProductCart] = useState(state);
    let priceCart: number = 0;
    productCart.map((e: any) => priceCart = priceCart + e.price);

    const deleteProduct = (e:any) =>{
        setProductCart(
            productCart.filter((product: any) => product.id !== e )
        );
    };

    return (
        <div className={styles.bodyCart}>
            <NavBar />

            <form>

            <div className={styles.centralice}>

                <div>
                {
                    productCart.map((e: any) =>{
                        return(
                            <div className={styles.half1}>
                                <img src={e.image} alt="Not found" style={{width:"100px", height:"100px"}}/>
                                <div className={styles.info}>
                                    <div>BRAND:</div>
                                    <div>TITLE: {e.title}</div>
                                    <div>SIZE:</div>
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
                    <button className={styles.buttonCart}>BUY</button>
                    <Link to="/home" style={{width:"100%"}}>
                        <button className={styles.buttonCart}>CONTINUE SHOPPING</button>
                    </Link>
                </div>
            </div>

            </form>

        </div>
    )
}
