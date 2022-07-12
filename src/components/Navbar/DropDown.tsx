import React, { useState } from "react";

export default function DropDown(){
    const [dropDown, setDropDown] = useState(false);

    return(
        <div style={{backgroundColor:"black"}}>
            <div><h1>DROPDOWN</h1></div>
        </div>
    );
};