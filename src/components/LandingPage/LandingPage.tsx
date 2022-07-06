import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function () {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (value.length === 0) {
            console.log("new value");
            setValue("new value");
        }
    }, []);

    return (
        <div>
            <Link to="/home">
                <button>Login</button>
            </Link>
        </div>
    );
}
