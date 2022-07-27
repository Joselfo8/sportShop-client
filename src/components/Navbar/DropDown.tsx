import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanStore, getProductsByCategory, getProductsByCategoryAndSubcategory } from "../../redux/action";
import styles from "./DropDown.module.scss";

export default function DropDown(categoryClick:any){
    const dispatch = useDispatch();
    const productSubCategory = useSelector((state:any) => state.rootReducer.categories.categories);

    function productCategory(e:any, d:any){
        dispatch(getProductsByCategoryAndSubcategory({
            "category": e,
            "argument": d,
        }));
    };
    return(
        <>
        <ul key={categoryClick} className={styles.servicesSubmenu}>
        {
            productSubCategory.map((e:any) => {
                return( categoryClick.categoryClick === e.category ?
                    <li key={e.sub_category}>
                        <Link key={e.sub_category} to={`/${e.category}/${e.sub_category}`}>
                            <button key={e.sub_category} className={styles.buttonNav} onClick={() => productCategory(categoryClick.categoryClick, e.sub_category)}>{e.sub_category}</button>
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
