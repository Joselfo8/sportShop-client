import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/action';
import Card from '../Card/Card';
import NavBar from '../Navbar/Navbar';
import Products from '../Products/Products';


export default function Subcategory(){
    
    return (
        <div>
            <h1>Subcategory</h1>
        </div>
    );
};