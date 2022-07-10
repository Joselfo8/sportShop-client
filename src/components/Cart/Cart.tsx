import React from "react";
import NavBar from "../Navbar/Navbar";
import deleteB from "../../assets/delete.png";
import styles from "./Cart.module.scss";

export default function Cart(){
    return (
        <div className={styles.bodyCart}>
            <NavBar />

            <div className={styles.centralice}>

                <div className={styles.half1}>
                    <img src="" alt="Not found"/>
                    <div className={styles.info}>
                        <div>BRAND:</div>
                        <div>TITLE:</div>
                        <div>SIZE:</div>
                        <select>
                        <option>1</option>
                        </select>
                    </div>
                    <div className={styles.info2}>
                        <div>PRICE:</div>
                        <img src={deleteB} className={styles.buttonDelete}/>
                    </div>
                </div>


                <div className={styles.half2}>
                    <div>PRICE:</div>
                    <div>TOTAL:</div>
                    <button className={styles.buttonCart}>BUY</button>
                    <button className={styles.buttonCart}>Continue buying</button>
                </div>
            </div>

        </div>
    )
}