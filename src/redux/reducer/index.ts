import { combineReducers } from "redux";
// Reducers
import auth from "./auth";
import message from "./message";

import {
  GET_PRODUCTSBYNAME,
  GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY,
  GET_USER_INFORMATION,
  GET_SHOPPINGLIST_BY_USER_ID,
} from "../action/types";
import Products from "../../components/Products/Products";

const initialState: any = {
    products: [],
    productsFiltered: [],
    searchProducts: [],
    productCart: [],
    details: {},
    userInformation: {},
    shoppinglist: [],
    allUsers: [],
    searchUser: [],
    favorites: []
};

function rootReducer(state = initialState, action: any){
    switch(action.type){
         case "GET_PRODUCTS":
            return {
              ...state,
              ...action.payload,
              productCart: action.payload.products,
            };

        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload.product
            }

        case GET_PRODUCTSBYNAME:
            const filter: any = state.products.filter((product: any) => product.title.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                productsFiltered: filter
            }

        case "GET_USER_BY_NAME":
            const filterUser: any = state.allUsers.filter((user: any) => user.name.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                searchUser: filterUser
            }

        case "GET_BY_CATEGORY":
            return{
                ...state,
                productsFiltered:action.payload.products,
            }
            
        case GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY:
            return {
              ...state,
              maxPage: action.payload.maxPage,
              next: action.payload.next,
              previous: action.payload.previous,
              productsFiltered: action.payload.products,
            }; 

        case "CLEAN_STORE":
            console.log("desde CLEAN_STORE")
            return{
                ...state,
                productsFiltered: [],
            }

        case "ORDER_BY_PRICE":
            return {
                ...state,
                products: action.payload, 
              }
        
         
        case GET_USER_INFORMATION:
            return{
                ...state,
                userInformation: action.payload,
            }
            
        case GET_SHOPPINGLIST_BY_USER_ID:
            return{
                ...state,
                shoppinglist: action.payload,
            }


        case "POST_PRODUCT":
            console.log(action.payload)
            return {
                ...state,
                products: state.products.concat(action.payload)
            }

        case "GET_ALL_USERS":
            return{
                ...state,
                allUsers: action.payload.users
            }
        
        case "ADD_TO_CART": 
            return {
                ...state,
                productCart: state.productCart.concat(action.payload)
            }
        
        case "ADD_TO_FAVORITES": 
            return {
                ...state,
                favorites: state.favorites.concat(action.payload)
            }
        case "GET_FAVORITES":
            return {
                ...state,
                favorites: action.payload
            }
 
        default:
            return state;
    };
};

export default combineReducers({ auth, message, rootReducer });