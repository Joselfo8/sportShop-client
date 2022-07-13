import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardList.module.scss";

export default function CardList(){
    return(
        <div className={styles.bodyCard}>
            <img />

            <div className={styles.containerInfo}>
                <span>Title</span>
                <span>Id</span>
                <span>Category</span>
                <span>Creation date</span>
            </div>

            <div className={styles.containerButtons}>
                <a href="/admin/edit"><button>LAPIZ</button></a>
                <button>X</button>
            </div>
        </div>
    );
};