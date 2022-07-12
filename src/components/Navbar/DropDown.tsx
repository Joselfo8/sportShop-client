import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanStore, getProductsByCategory, getProductsByCategoryAndSubcategory } from "../../redux/action";
import styles from "./DropDown.module.scss";

export default function DropDown(categoryClick:any){
    const dispatch = useDispatch();
    const state = useSelector((state:any) => state.products);

    function productCategory(e:any, d:any){
        console.log(e, d)
        dispatch(getProductsByCategoryAndSubcategory({
            "category": e,
            "argument": d,
        }));
    };

    return(
        <>
        <ul className={styles.servicesSubmenu}>
        {
            state.map((e:any) => {
                return( categoryClick.categoryClick === e.category ?
                    <li>
                        <Link to={"/products"}>
                            <button className={styles.buttonNav} onClick={() => productCategory(categoryClick.categoryClick, e.subCategory)}>{e.subCategory}</button>
                        </Link>
                    </li>
                    : <></>
                )
            })
        }
        </ul>
        </>
    );
};
