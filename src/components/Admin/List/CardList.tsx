import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardList.module.scss";
import {FaTrash} from "react-icons/fa";
import {BsFillPencilFill} from "react-icons/bs"

export default function CardList(){
    return(
        <div className={styles.bodyCard}>
            <img src="" alt="" />

            <div className={styles.containerInfo}>
                <span>Title: {}</span>
                <span>Id: {}</span>
                <span>Category: {}</span>
                <span>Creation date: {}</span>
            </div>

            <div className={styles.containerButtons}>
                <Link to="/edit" style={{color:"black"}}>
                    <BsFillPencilFill/>
                </Link>
                <FaTrash/>
            </div>

        </div>
    );
};