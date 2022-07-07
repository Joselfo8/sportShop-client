import axios from "axios";

import {
    GET_PRODUCTSBYNAME
} from '../actionsTypes/actionsTypes'

export function getProducts(){
    return async function name(dispatch: any) {
        let json: any = await axios.get('https://fakestoreapi.com/products?limit=10');
        return dispatch({
            type: "GET_PRODUCTS",
            payload: json.data
        })
    }
};

export const getDetails = (id: any) => async (dispatch: any) => {
    try {
        const json: any = await axios.get(`https://fakestoreapi.com/products/${id}`)
        return dispatch({
            type: "GET_DETAILS",
            payload: json.data
        })
    } catch(error) {
        console.log(error)
        return alert('No se ha encontrado el producto')
    }
}

export function filterByCategory(payload: any){
    return{
        type: "FILTER_BY_CATEGORY",
        payload
    }
};

export function getProductsByName(name: any){
    return {
        type: GET_PRODUCTSBYNAME,
        payload: name
    }
};
