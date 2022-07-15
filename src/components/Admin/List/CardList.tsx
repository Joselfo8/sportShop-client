import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardList.module.scss";
import {FaTrash} from "react-icons/fa";
import {BsFillPencilFill} from "react-icons/bs"
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/action";
import user from "../../../assets/userByAdmin.png"

export default function CardList({title, id, category, image, name, role}:any){
    const dispatch = useDispatch();
    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id));
    };
    return(
        <div className={styles.bodyCard}>

            <div className={styles.containerImgInfo}>
                {   image ?
                    <img src={image} alt="" style={{width:"70px"}}/> :
                    <img src={user} style={{width:"70px"}}/>
                }

                <div className={styles.containerInfo}>
                    { title ? <span>Title: {title}</span> : null }
                    { name ? <span>Name: {name}</span> : null }
                    { id ? <span>Id: {id}</span> : null }
                    { role ? <span>Role: {role}</span> : null }
                    { category ? <span>Category: {category}</span> : null }
                </div>
            </div>

            <div className={styles.containerButtons}>
                <Link to={`/editProduct/${id}`} style={{color:"black"}}>
                    <BsFillPencilFill/>
                </Link>
                <FaTrash onClick={() => {handleDelete(id)}} className={styles.buttonX}/>
            </div>

        </div>
    );
};