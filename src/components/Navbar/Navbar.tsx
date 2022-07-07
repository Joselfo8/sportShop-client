import React, { useState } from 'react';
import logo from '../../assets/logo.png'

export default function NavBar(){
    const [value, setValue] = useState({})


    function handleChange(event: any) {
        setValue(event)
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(value)
    }

    return (
        <div>
            <img src={logo}/>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    name="searchProducts"
                    id="searchProducts"
                    placeholder='Search by products...'
                    onChange={(e) => handleChange(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <button>Hombre</button>

            <button>Mujer</button>

            <button>Infantil</button>

            <button>Deporte</button>

        </div>
    );
};