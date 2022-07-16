import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanStore, getProductsByCategory, getProductsByCategoryAndSubcategory } from "../../redux/action";
import styles from "./DropDown.module.scss";

export default function DropDown(categoryClick:any){
    const dispatch = useDispatch();
    const productSubCategory = useSelector((state:any) => state.rootReducer.products);

    function productCategory(e:any, d:any){
        console.log(e, d)
        dispatch(getProductsByCategoryAndSubcategory({
            "category": e,
            "argument": d,
        }));
    };
    let data = productSubCategory.map((e:any) => { return [e.category, e.subCategory]});
    let result = data.filter((item:any,index:any)=>{
        return data.map((e:any) => e[0]).indexOf(item[0]) === index ||
        data.map((e:any) => e[1]).indexOf(item[1]) === index
    });
    return(
        <>
        <ul className={styles.servicesSubmenu}>
        {
            result.map((e:any) => {
                return( categoryClick.categoryClick === e[0] ?
                    <li>
                        <Link to={"/products"} >
                            <button className={styles.buttonNav} onClick={() => productCategory(categoryClick.categoryClick, e[1])}>{e[1]}</button>
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
