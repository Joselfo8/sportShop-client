import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'
import { getProducts, getProductsByName } from '../../redux/action'

export default function NavBar(){
    const [value, setValue] = useState({})
    const dispatch = useDispatch()

    const allState = useSelector((state) => state)

    function handleChange(event: any) {
        setValue(event)
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        dispatch(getProductsByName(value))
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

            <Link to='/man'>
                <button>Man</button>
            </Link>

            <Link to='/woman'>
                <button>Woman</button>
            </Link>

            <button>Infantil</button>

            <button>Deporte</button>

            <Link to='/cart'>
                <button>Carro</button>
            </Link>

        </div>
    );
};