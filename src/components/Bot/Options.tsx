import React from "react";
import { Link } from "react-router-dom";

const Options = () => {
    const options = [
        {
            text: "Settings",
            link: "/user/profile",
            id: 1
        }
    ];
    const buttonMarkup = options.map((option : any) => (
        <Link to={option.link}><button>{option.text}</button></Link>
    ));
    return <div>{buttonMarkup}</div>;
};


export default Options;