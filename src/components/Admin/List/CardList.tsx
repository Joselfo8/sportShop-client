import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardList.module.scss";
import {FaTrash} from "react-icons/fa";
import {BsFillPencilFill} from "react-icons/bs"
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/action";

export default function CardList({title, id, category, image}:any){
    const dispatch = useDispatch();
    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id));
    };
    return(
        <div className={styles.bodyCard}>

            <div className={styles.containerImgInfo}>
                <img src={image} alt="" style={{width:"70px"}}/>

            <div className={styles.containerInfo}>
                    <span>Title: {title}</span>
                    <span>Id: {id}</span>
                    <span>Category: {category}</span>
                    <span>Creation date:</span>
                </div>
            </div>

            <div className={styles.containerButtons}>
                <Link to={`/edit/${id}`} style={{color:"black"}}>
                    <BsFillPencilFill/>
                </Link>
                <FaTrash onClick={() => {handleDelete(id)}}/>
            </div>

        </div>
    );
};