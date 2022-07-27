import { combineReducers } from "redux";
// Reducers
import auth from "./auth";
import message from "./message";
import admin from "./admin";
import products from "./products";
import user from "./user";

import {
  GET_PRODUCTSBYNAME,
  GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY,
  GET_USER_INFORMATION,
  GET_SHOPPINGLIST_BY_USER_ID,
} from "../action/types";

const initialState: any = {
  products: [],
  productsFiltered: [],
  productCart: [],
  shoppinglist: [],
  favorites: [],
  categories: [],
  details: {},
  userInformation: {},
  cart: {}
};

function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        ...action.payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload.product,
      };

    case GET_PRODUCTSBYNAME:
      return {
        ...state,
        productsFiltered: action.payload,
      };

    case "GET_BY_CATEGORY":
      return {
        ...state,
        productsFiltered: action.payload,
      };

    case GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY:
      return {
        ...state,
        maxPage: action.payload.maxPage,
        next: action.payload.next,
        previous: action.payload.previous,
        productsFiltered: action.payload,
      };

    case "CLEAN_STORE":
      return {
        ...state,
        productsFiltered: [],
      };

    case "ORDER_BY_PRICE":
      return {
        ...state,
        products: action.payload,
      };

    case GET_USER_INFORMATION:
      return {
        ...state,
        userInformation: action.payload,
      };

    case GET_SHOPPINGLIST_BY_USER_ID:
      return {
        ...state,
        shoppinglist: action.payload,
      };

    case "POST_PRODUCT":
      return {
        ...state,
        products: state.products.concat(action.payload),
      };

    case "ADD_TO_CART":
      return {
        ...state,
        productCart: state.productCart.concat(action.payload),
      };

    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.concat(action.payload),
      };
    case "GET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    case "ALL_CATEGORIES":
      return{
        ...state,
        categories: action.payload,
      }
    case "POST_PURCHASE":
      return{
        
      }
    default:
      return state;
  }
}

export default combineReducers({ auth, message, rootReducer, admin, products, user });
