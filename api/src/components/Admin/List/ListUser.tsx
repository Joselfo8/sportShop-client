import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName, getAllUsers } from "../../../redux/action/admin";
import styles from "./List.module.scss"
import CardList from "./CardList";

export default function ListUsers(){
    const dispatch = useDispatch();
    const state = useSelector((state:any) =>{
        return{
            users: state.admin.users,
            search: state.admin.searchUser,
        }
    });
    const [ value, setValue ] = useState('');
    const typeList = 'USER';
    useEffect(() => {
        dispatch(getAllUsers());
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
            {   state.search.length === 0
                ?
                state.users.map((e:any,index:any) => {
                    return <CardList key={index} name={e.name} id={e.id} role={e.role} image={e.image} type={typeList}/>
                })
                :
                state.search.map((e:any,index:any) => {
                    return <CardList key={index} name={e.name} id={e.id} role={e.role} image={e.image} type={typeList}/>
                })
            }
        </div>
    );
};