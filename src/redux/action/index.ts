import axios from "axios";

export function getProducts(){
    return async function name(dispatch: any) {
        let json: any = await axios.get('https://fakestoreapi.com/products?limit=10');
        return dispatch({
            type: "GET_PRODUCTS",
            payload: json.data
        })
    }
};