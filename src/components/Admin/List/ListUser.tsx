import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName, getUsers } from "../../../redux/action";
import styles from "./List.module.scss"
import CardList from "./CardList";

export default function ListUsers(){
    const dispatch = useDispatch();
    const state = useSelector((state:any) => state);
    const [ value, setValue ] = useState('');
    const typeList = 'USER';
    useEffect(() => {
        dispatch(getUsers());
    },[]);
    function handleChange(event: any) {
        setValue(event);
    };
    function handleSubmit(event: any) {
        event.preventDefault();
        dispatch(getUserByName(value));
    };
    return(
        <div className={styles.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                name="search"
                type="text"
                placeholder="Search"
                id="searchProducts"
                onChange={(e) => handleChange(e.target.value)}
                />
            </form>
            {   state.searchUser.length === 0 ?
                state.allUsers.map((e:any) => {
                    return <CardList name={e.name} id={e.id} role={e.role} image={e.image} type={typeList}/>
                }) :
                state.searchUser.map((e:any) => {
                    return <CardList name={e.name} id={e.id} role={e.role} image={e.image} type={typeList}/>
                })
            }
        </div>
    );
};