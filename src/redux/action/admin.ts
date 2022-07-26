import axios from "axios";
import {
    PUT_STATE_TO_ORDER,
} from './types'

export const getAllProducts = (page? : number, limit? : string) => async (dispatch: any) => {
    try{
        const response = await axios.get(
            `https://vlixes-server.herokuapp.com/products?pag=${page ? page : 1}&limit=${limit ? limit : 5}`
            );
        return dispatch({
            type: "ALL_PRODUCTS",
            payload: response.data
        });
    }catch(error){
        console.log(error);
    };
};
export const  getProductsByName = (name: any) => async(dispatch: any) => {
    try{
        const response = await axios.get("https://vlixes-server.herokuapp.com/products?title=" + name);
        return dispatch({
            type: "GET_PRODUCT_BY_NAME",
            payload: response.data,
        });
    }catch(error){
        console.log(error);
    };
};
export const deleteProduct = (id: number) => async (dispatch: any) => {
    try {
        const response: any = await axios.delete(`https://vlixes-server.herokuapp.com/products/${id}`);
        dispatch(getAllProducts());
    } catch (error) {
        console.log(error);
    }
};
export const getAllUsers = () => async (dispatch: any) => {
    try {
        const response: any = await axios.get("https://vlixes-server.herokuapp.com/users");
        return dispatch({
            type: "GET_ALL_USERS",
            payload: response.data,
        });
    }catch (error) {
        console.log(error);
    }
};
export const getUserByName = (name: string) => {
    try {
        return {
            type: "GET_USER_BY_NAME",
            payload: name,
        };
    }catch (error) {
        console.log(error);
    }
};
export const deleteUser = (id: number) => async (dispatch: any) => {
    try {
        const response: any = await axios.delete("https://vlixes-server.herokuapp.com/users/" + id);
        dispatch(getAllUsers());
        return response;
    } catch (error) {
        console.log(error);
    }
};

export function getOrders() {
    try {
      return async function name(dispatch: any) {
        let json: any = await axios.get(`https://vlixes-server.herokuapp.com/buys`);
        return dispatch({
          type: "GET_ORDERS",
          payload: json.data,
        });
      };
    } catch (error) {
      console.log(error);
    }
}

export function getOrderById(id: any) {
    try {
      return async function name(dispatch: any) {
        let json: any = await axios.get(`https://vlixes-server.herokuapp.com/buys/${id}`);
        return dispatch({
          type: "GET_ORDERS_BY_ID",
          payload: json.data,
        });
      };
    } catch (error) {
      console.log(error);
    }
}
// POST_STATE_TO_ORDER
export function putStateToOrder(object: any) {
    console.log("postStateToOrder", object)
    try {
      return async function state(dispatch: any) {
        let json: any = await axios.put(`https://vlixes-server.herokuapp.com/buys`, object);
        dispatch(getOrderById(object.id));
      };
    } catch (error) {
      console.log(error);
    }
  }

export const isAdmin = (token : string) => async(dispatch : any) => {
    try{
        const response = await axios.get(`https://vlixes-server.herokuapp.com/users/isAdmin?token=` + token);
        return dispatch({
            type: "IS_ADMIN",
            payload: response.data.admin
        });
    }catch(error){
        console.log(error);
    };
};