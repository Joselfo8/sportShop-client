import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "redux/action/admin";

export default function Paginated(){
    const dispatch = useDispatch();

    let number : number = 1;

    const handleNext = (page : number, limit? : string ) => {
        number = number + page;
        dispatch(getAllProducts(number, limit));
    };

    return(
        <div>
            <button onClick={() => handleNext(-1)} value={-1}> {`<`}</button>
            <button onClick={() => handleNext(1)} value={1}>{`>`}</button>

            <select onChange={(limit) => handleNext(0, limit.target.value)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </select>
        </div>
    );
};