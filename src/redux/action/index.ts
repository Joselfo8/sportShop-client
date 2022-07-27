import axios from "axios";
import {
  GET_PRODUCTSBYNAME,
  GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY,
  POST_PURCHASE,
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

export const getProductsByName = (name: string) => async(dispatch: any) =>  {
  try{
    console.log(name)
    const response = await axios.get("https://vlixes-server.herokuapp.com/products?title=" + name);
    return dispatch({
      type: GET_PRODUCTSBYNAME,
      payload: response.data,
    });
  }catch(error){
    console.log(error);
  };
};

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
  console.log(object)
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
    console.log(json.data)
    return dispatch({ type: "POST_PRODUCT", payload: json.data });
  } catch (error) {
    console.log(error);
  }
};

export function getUserInformation() {
  try {
    return async function user(dispatch: any) {
      let json: any = await axios.get(`https://vlixes-server.herokuapp.com/users/`);
      console.log("getUserInformation",json.data.data)
      return dispatch({
        type: GET_USER_INFORMATION,
        payload: json.data.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function getShoppingListByUserId() {
  // console.log(object)
  try {
    return async function shoppinglist(dispatch: any) {
      let json: any = await axios.get(`https://vlixes-server.herokuapp.com/shopping_list/`);
      return dispatch({
        type: GET_SHOPPINGLIST_BY_USER_ID,
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export const editProduct = ( payload: any) => async (dispatch: any) => {
    try {
      const json: any = await axios.put(`https://vlixes-server.herokuapp.com/products/`, payload);
      console.log(json)
      // dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
};

export const addProductToCart = (payload:any) => async (dispatch:any) => {
  try {
    console.log(payload)
    const json:any = await axios.post('https://vlixes-server.herokuapp.com/shopping_list', payload)
    
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

export const getFavorites = () => async(dispatch:any,) => {
  try {
    const json: any = await axios.get(`https://vlixes-server.herokuapp.com/favorites`)
    dispatch({type: "GET_FAVORITES", payload: json.data.list})
  } catch (error) {
    console.log(error)
  }
}

export const deleteFavorite = (payload:any) => async (dispatch: any) => {
  try {
    console.log(payload)
    const json = await axios.delete(`https://vlixes-server.herokuapp.com/favorites?product=${payload.product}`);
    dispatch(getFavorites())
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductShop = (pId : number) => async (dispatch: any) => {
  try{
    const response: any = await axios.delete(`https://vlixes-server.herokuapp.com/shopping_list/?product=` + pId);
    dispatch(getShoppingListByUserId())
  }catch(error){
    console.log(error);
  };
};

export const allCategories = () => async (dispatch: any) => {
  try{
    const response = await axios.get("https://vlixes-server.herokuapp.com/products/category");
    return dispatch({
      type: "ALL_CATEGORIES",
      payload: response.data,
    })
  }catch(error){
    console.log(error);
  };
};

// Compra
export function postPurchase(object: any) {
  console.log("postPurchase", object)
  try {
    return async function purchase(dispatch: any) {
      let json: any = await axios.post(`https://vlixes-server.herokuapp.com/buys`, object);
      return dispatch({
        type: POST_PURCHASE,
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}


export const addStock = (payload:any) => async (dispatch:any) => {
  try {
    const json = await axios.post('https://vlixes-server.herokuapp.com/stock',payload)
    console.log(json)
    dispatch(getDetails(payload.product))
  } catch(error) {
    console.log(error)
  }
}
