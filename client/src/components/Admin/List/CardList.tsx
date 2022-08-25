import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardList.module.scss";
import {FaTrash} from "react-icons/fa";
import {BsFillPencilFill} from "react-icons/bs"
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/action/admin";
import user from "../../../assets/userByAdmin.png"
import { deleteProduct } from "../../../redux/action/admin";
import {IoMdAddCircleOutline} from "react-icons/io"

export default function CardList({title, id, category, image, name, role, type}:any){
    const dispatch = useDispatch();
    const handleDelete = (id: number) => {
        if(type === "PRODUCT"){
            dispatch(deleteProduct(id));
        }else if(type === "USER"){
            dispatch(deleteUser(id));
        }else if(type === "BILL"){
        };
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
                { type === "PRODUCT" ?
                    <Link to={`/admin/editProduct/${id}`} style={{color:"black"}}>
                        <BsFillPencilFill size={18}/>
                    </Link>
                    : <></>
                }
                <FaTrash size={18} onClick={() => {handleDelete(id)}} className={styles.buttonX}/>

                { type === "PRODUCT" ?
                <Link to={`/stock/${id}`}  style={{color:"black"}}>
                <IoMdAddCircleOutline size={18} className={styles.buttonStock}/>
            </Link>
                    : <></>
                }


            </div>

        </div>
    );
};