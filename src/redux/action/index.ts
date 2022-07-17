import axios from "axios";
import {
  GET_PRODUCTSBYNAME,
  GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY,
  GET_USER_INFORMATION,
  GET_SHOPPINGLIST_BY_USER_ID,
} from "./types";
const API_URL = process.env.REACT_APP_API_URL;

export function getProducts(page?: number) {
  try {
    return async function name(dispatch: any) {
      let json: any = await axios.get(
        `${API_URL}/products?pag=${page ? page : 1}&limit=3`
      );

      return dispatch({
        type: "GET_PRODUCTS",
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
    return alert("Product not found!");
  }
}

export const getDetails = (id: any) => async (dispatch: any) => {
  try {
    const json: any = await axios.get(`https://vlixes-server.herokuapp.com/products/${id}`);
    return dispatch({
      type: "GET_DETAILS",
      payload: json.data,
    });
  } catch (error) {
    console.log(error);
    return alert("No se ha encontrado el producto");
  }
};

export function filterByCategory(payload: any) {
  return {
    type: "FILTER_BY_CATEGORY",
    payload,
  };
}

export function getProductsByName(name: any) {
  return {
    type: GET_PRODUCTSBYNAME,
    payload: name,
  };
}

export function getProductsByCategory(event: any) {
  try {
    return async function name(dispatch: any) {
      let json: any = await axios.get(
        `https://vlixes-server.herokuapp.com/products?category=${event}`
      );
      return dispatch({
        type: "GET_BY_CATEGORY",
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function getProductsByCategoryAndSubcategory(object: any) {
  // console.log(object)
  try {
    return async function name(dispatch: any) {
      let json: any = await axios.get(
        `${API_URL}/products?category=${object.category}&subCategory=${object.argument}`
      );
      return dispatch({
        type: GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY,
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function cleanStore(payload: any) {
  return {
    type: "CLEAN_STORE",
    payload,
  };
}

export const orderByPrice = (order: any) => async(dispatch: any) => {
  try {
    const json = await axios.get(`http://vlixes-server.herokuapp.com/products?order=${order}`)
    return dispatch({ type: "ORDER_BY_PRICE", payload: json.data.products });
  } catch (error) {
    console.log(error)
  }
 
};

export const addProduct = (payload:any) => async (dispatch: any) => {
  try {
    const json: any = await axios.post("https://vlixes-server.herokuapp.com/products",payload);
    // console.log(json.data)
    return dispatch({ type: "POST_PRODUCT", payload: json.data });
  } catch (error) {
    console.log(error);
  }
};

export function getUserInformation(UserId: any) {
  try {
    return async function name(dispatch: any) {
      let json: any = await axios.get(
        `https://vlixes-server.herokuapp.com/users/${UserId}`
      );
      return dispatch({
        type: GET_USER_INFORMATION,
        payload: json.data.user,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function getShoppingListByUserId(UserId: any) {
  // console.log(object)
  try {
    return async function name(dispatch: any) {
      let json: any = await axios.get(
        `https://vlixes-server.herokuapp.com/shopping_list/${UserId}`
      );
      return dispatch({
        type: GET_SHOPPINGLIST_BY_USER_ID,
        payload: json.data.list,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export const getUsers = () => async (dispatch: any) => {
  try {
    const response: any = await axios.get(
      "https://vlixes-server.herokuapp.com/users"
    );
    return dispatch({
      type: "GET_ALL_USERS",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id: number) => async (dispatch: any) => {
  try {
    const response: any = await axios.delete(
      `https://vlixes-server.herokuapp.com/products/${id}`
    );
    dispatch(getProducts());
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id: number) => async (dispatch: any) => {
  try {
    const response: any = await axios.delete(
      "https://vlixes-server.herokuapp.com/users/" + id
    );
    dispatch(getUsers());
    return response;
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

export const editProduct = ( payload: any) => async (dispatch: any) => {
    try {
      const json: any = await axios.put(`https://vlixes-server.herokuapp.com/products/`, payload);
      console.log(json)
      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
};

export const addProductToCart = (payload:any) => async (dispatch:any) => {
  try {
    console.log(payload)
    const json:any = await axios.post('https://vlixes-server.herokuapp.com/shopping_list', payload)
    console.log(json.data)
    dispatch({type: "ADD_TO_CART", payload:json.data}) 
  } catch (error) {
    console.log(error)
  }
}

export const addProductToFavorites = (payload:any) => async(dispatch:any) => {
  try {
    const json:any = await axios.post('https://vlixes-server.herokuapp.com/favorites', payload)
    dispatch({type: "ADD_TO_FAVORITES", payload:json.data})
  } catch (error) {
    console.log(error)
  }
}

export const getFavorites = (userID:any) => async(dispatch:any,) => {
  try {
    const json: any = await axios.get(`https://vlixes-server.herokuapp.com/favorites/${userID}`)
    dispatch({type: "GET_FAVORITES", payload: json.data.list})
  } catch (error) {
    console.log(error)
  }
}

export const deleteFavorite = (payload:any) => async (dispatch: any) => {
  try {
    console.log(payload)
    const json = await axios.delete(`https://vlixes-server.herokuapp.com/favorites?user=${payload.user}&product=${payload.product}`);

  } catch (error) {
    console.log(error);
  }
};
