import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/action";
import styles from "./List.module.scss"
import CardList from "./CardList";

export default function ListProduct(){
    const dispatch = useDispatch();
    const allUsers = useSelector((state:any) => state.allUsers);
    useEffect(() => {
        dispatch(getUsers());
    },[]);
    console.log(allUsers[0])
    return(
        <div className={styles.container}>
            <input/>
            {   allUsers &&
                allUsers.map((e:any) => {
                    return <CardList name={e.name} id={e.id} role={e.role} image={e.image}/>
                })
            }
        </div>
    );
};