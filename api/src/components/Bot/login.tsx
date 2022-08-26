import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const login = [
        {
            text: "Login",
            link: "/login",
            id: 1
        }
    ];
    const buttonMarkup = login.map((option : any) => (
        <Link to={option.link}><button>{option.text}</button></Link>
    ));
    return <div>{buttonMarkup}</div>;
};


export default Login;