import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Components
import Pagination from "../Pagination";

export default function () {
    return (
        <div>
            <Link to="/home">
                <button>Login</button>
            </Link>
        </div>
    );
}
