import {
  GET_USER,
  UPDATE_USER,
  UPDATE_AVATAR,
  DELETE_AVATAR,
  ADD_SHIPPING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
  DELETE_SHIPPING_ADDRESS,
  GET_USER_ORDERS,
} from "../action/types";
// Interfaces
import { AddressProps } from "components/ProfileCard/UserInfo";
const initialState = {
  name: null,
  lastname: null,
  shippingAddresses: [],
  // orders: [],
  email: null,
  genre: null,
  dateOfBirth: null,
  avatar: null,
  orders: [],
  order: {},
};

function user(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        ...payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: payload,
      };
    case DELETE_AVATAR:
      return {
        ...state,
        avatar: null,
      };
    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddresses: [...state.shippingAddresses, payload],
      };
    case UPDATE_SHIPPING_ADDRESS:
      // replace old address with updated
      const addr = state.shippingAddresses.map((a: AddressProps["data"]) => {
        if (a.id === payload.id) return payload;

        return a;
      });

      return {
        ...state,
        shippingAddresses: addr,
      };
    case DELETE_SHIPPING_ADDRESS:
      // delete addr from state
      const addresses = state.shippingAddresses.filter(
        (a: AddressProps["data"]) => a.id !== payload
      );

      return {
        ...state,
        shippingAddresses: addresses,
      };
    case GET_USER_ORDERS:
      // console.log("GET_USER_ORDERS", action.payload)
      const orders = action.payload.map((order:any) => {
        return {
            buy_id: order.id,
            status_actual: order.status_history[order.status_history.length -1]
        }
      })
      // let orders = {buys: data}
      return {
        ...state,
        orders: orders,
      };
    default:
      return state;
  }
}

export default user;
