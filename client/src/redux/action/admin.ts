import axios from "axios";
import {

    GET_ORDERS,
    GET_ORDERS_BY_ID,
    GET_ORDERS_BY_STATE,
    PUT_STATE_TO_ORDER,
    GET_ORDER_BY_ID,
    PUT_TRACKING_NUMBER,
} from './types'

const API_URL = "https://vlixes-server.herokuapp.com";

export const getAllProducts =
  (page?: number, limit?: string) => async (dispatch: any) => {
    try {
      const response = await axios.get(
        `${API_URL}/products?pag=${page ? page : 1}&limit=${limit ? limit : 5}`
      );
      return dispatch({
        type: "ALL_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const getProductsByName = (name: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${API_URL}/products?title=${name}`);
    return dispatch({
      type: "GET_PRODUCT_BY_NAME",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = (id: number) => async (dispatch: any) => {
  try {
    const response: any = await axios.delete(`${API_URL}/products/${id}`);
    dispatch(getAllProducts());
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = () => async (dispatch: any) => {
  try {
    const response: any = await axios.get(`${API_URL}/users/all`);
    return dispatch({
      type: "GET_ALL_USERS",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserByName = (name: string) => {
  try {
    return {
      type: "GET_USER_BY_NAME",
      payload: name,
    };
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = (id: number) => async (dispatch: any) => {
  try {
    const response: any = await axios.delete(`${API_URL}/users/${id}`);
    dispatch(getAllUsers());
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Order(s)

export function getOrders(pagination: string) {
  try {
    return async function order(dispatch: any) {
      let json: any = await axios.get(`${API_URL}/buys${pagination}`);
      return dispatch({
        type: GET_ORDERS,
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function getOrdersById(id: any) {
    try {
      return async function order(dispatch: any) {
        let json: any = await axios.get(`https://vlixes-server.herokuapp.com/buys/${id}`);
        return dispatch({
          type: GET_ORDERS_BY_ID,
          payload: json.data,
        });
      };
    } catch (error) {
      console.log(error);
    }
}

export function getOrderById(id: any) {
    try {
      return async function order(dispatch: any) {
        let json: any = await axios.get(`https://vlixes-server.herokuapp.com/buys/${id}`);
        return dispatch({
          type: GET_ORDER_BY_ID,
          payload: json.data,
        });
      };
    } catch (error) {
      console.log(error);
    }
}

export function getOrdersByState(state: any) {
  try {
    return async function orders(dispatch: any) {
      // vlixes-server.herokuapp.com/buys?status=Preparing order
      let json: any = await axios.get(`${API_URL}/buys?status=${state}`);
      return dispatch({
        type: GET_ORDERS_BY_STATE,
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}


export function putStateToOrder(object: any) {
  try {
    return async function state(dispatch: any) {
      let json: any = await axios.put(`${API_URL}/buys`, object);
      dispatch(getOrderById(object.id));
    };
  } catch (error) {
    console.log(error);
  }
}

// PUT_DELIVERY_NUMBER
export function putTrackingNumber(object: any) {
  try {
    return async function state(dispatch: any) {
      let json: any = await axios.put(`${API_URL}/buys/delivery`, object);
      dispatch(getOrderById(object.shoppingId));
    };
  } catch (error) {
    console.log(error);
  }
}

// Role
export const isAdmin = (token: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${API_URL}/users/isAdmin?token=${token}`);
    return dispatch({
      type: "IS_ADMIN",
      payload: response.data.admin,
    });
  } catch (error) {
    console.log(error);
  }
};
