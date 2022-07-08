import { link } from "fs";
import React from "react";
import { Link } from "react-router-dom";

export default function Card({key, id, image, title, price}: any){
    return(
        <Link to={`/home/${id}`} key={key}>
            <div>
                {/* <img src={image} alt={title}/> */}
                <h4>{title}</h4>
                {/* <h4>{price}</h4> */}
            </div>
        </Link>
    );
};