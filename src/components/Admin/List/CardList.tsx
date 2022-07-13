import React from "react";
import { Link } from "react-router-dom";

export default function CardList(){
    return(
        <div>

            <Link to="/admin/edit"><button>LAPIZ</button></Link>
            <button>X</button>
        </div>
    )
}