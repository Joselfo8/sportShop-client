import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER,
  ADD_SHIPPING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
  DELETE_SHIPPING_ADDRESS,
} from "../action/types";
// Interfaces
import { AddressProps } from "components/ProfileCard/UserInfo";
// read JWT from localStorage
const response = localStorage.getItem("auth");
const initialState = response
  ? {
      isLoggedIn: true,
      auth: JSON.parse(response),
    }
  : {
      isLoggedIn: false,
      auth: null,
    };

function auth(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        auth: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        auth: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        auth: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: payload,
        },
      };
    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: {
            ...state.auth.user,
            shippingAddresses: [...state.auth.user.shippingAddresses, payload],
          },
        },
      };
    case UPDATE_SHIPPING_ADDRESS:
      // replace old address with updated
      const addr = state.auth.user.shippingAddresses.map(
        (a: AddressProps["data"]) => {
          if (a.id === payload.id) return payload;

          return a;
        }
      );

      return {
        ...state,
        auth: {
          ...state.auth,
          user: {
            ...state.auth.user,
            shippingAddresses: addr,
          },
        },
      };
    case DELETE_SHIPPING_ADDRESS:
      // delete addr from state
      const addresses = state.auth.user.shippingAddresses.filter(
        (a: AddressProps["data"]) => a.id !== payload
      );

      return {
        ...state,
        auth: {
          ...state.auth,
          user: {
            ...state.auth.user,
            shippingAddresses: addresses,
          },
        },
      };
    default:
      return state;
  }
}

export default auth;
