import axios from "axios";

import {
    GET_PRODUCTSBYNAME,
    GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY
} from '../actionsTypes/actionsTypes';

export function getProducts(){
    try{
        return async function name(dispatch: any) {
            let json: any = await axios.get('https://vlixes-server.herokuapp.com/products');
            return dispatch({
                type: "GET_PRODUCTS",
                payload: json.data
            });
        };
    }catch(error){
        console.log(error);
        return alert('Product not found!');
    };
};

export const getDetails = (id: any) => async (dispatch: any) => {
    try {
        const json: any = await axios.get(`https://vlixes-server.herokuapp.com/products/${id}`)
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

export function getProductsByCategory(event: any){
    try{
        return async function name(dispatch: any) {
            let json: any = await axios.get(`https://vlixes-server.herokuapp.com/products?category=${event}`);
            return dispatch({
                type: "GET_BY_CATEGORY",
                payload: json.data
            });
        };
    }catch(error){
        console.log(error);
    };
};

export function getProductsByCategoryAndSubcategory(object: any){
    // console.log(object)
    try{
        return async function name(dispatch: any) {
            let json: any = await axios.get(`https://vlixes-server.herokuapp.com/products?category=${object.category}&subCategory=${object.argument}`);
            return dispatch({
                type: GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY,
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


export const orderByPrice = (payload:any) =>  (dispatch:any) => {
    return dispatch({type: "ORDER_BY_PRICE", payload})
  }



