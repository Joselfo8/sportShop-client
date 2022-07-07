import axios from "axios";

import {
    GET_PRODUCTSBYNAME
} from '../actionsTypes/actionsTypes';

export function getProducts(){
    try{
        return async function name(dispatch: any) {
            let json: any = await axios.get('https://fakestoreapi.com/products?limit=10');
            return dispatch({
                type: "GET_PRODUCTS",
                payload: json.data
            });
        };
    }catch(error){
        console.log(error);
    };
};

export const getDetails = (id: any) => async (dispatch: any) => {
    try {
        const json: any = await axios.get(`https://fakestoreapi.com/products/${id}`)
        return dispatch({
            type: "GET_DETAILS",
            payload: json.data
        });
    } catch(error) {
        console.log(error)
        return alert('No se ha encontrado el producto');
    };
};

export function filterByCategory(payload: any){
    return{
        type: "FILTER_BY_CATEGORY",
        payload
    };
};

export function getProductsByName(name: any){
    return {
        type: GET_PRODUCTSBYNAME,
        payload: name
    };
};

export function getProductsMen(){
    try{
        return async function name(dispatch: any) {
            let json: any = await axios.get(`https://fakestoreapi.com/products/category/men's%20clothing`);
            return dispatch({
                type: "GET_MEN",
                payload: json.data
            });
        };
    }catch(error){
        console.log(error);
    };
};

export function getProductsWomen(){
    try{
        return async function name(dispatch: any) {
            let json: any = await axios.get(`https://fakestoreapi.com/products/category/women's%20clothing`);
            return dispatch({
                type: "GET_WOMEN",
                payload: json.data
            });
        };
    }catch(error){
        console.log(error);
    };
};

export function cleanStore(payload: any){
    return {
        type: "CLEAN_STORE",
        payload
    };
};



