import { toast } from "react-toastify";
import {
  GET_USER,
  UPDATE_USER,
  ADD_SHIPPING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
  DELETE_SHIPPING_ADDRESS,
} from "redux/action/types";
import UserService from "services/user.service";
// Interfaces
import { InfoProps } from "components/ProfileCard/UserInfo";
import { AddressProps } from "components/ProfileCard/UserInfo";

export function getUser() {
  return async (dispatch: any) => {
    try {
      const response = await UserService.getUser();
      const message = response.data?.msg || "Get user data successful";

      dispatch({
        type: GET_USER,
        payload: response.data.data,
      });

      return Promise.resolve(message);
    } catch (err: any) {
      const message = err.response.data?.msg || "Get user data fail";
      toast(message);

      return Promise.reject(message);
    }
  };
}

export function updateUser(data: InfoProps["data"]) {
  return async (dispatch: any) => {
    try {
      const response = await UserService.updateUser(data);
      const message = response.data?.msg || "Update successful";

      dispatch({
        type: UPDATE_USER,
        payload: response.data.data,
      });
      toast(message);

      return Promise.resolve(message);
    } catch (err: any) {
      const message = err.response.data?.msg || "Update fail";
      toast(message);

      return Promise.reject(message);
    }
  };
}

export function addShippingAddress(data: AddressProps["data"]) {
  return async (dispatch: any) => {
    try {
      const response = await UserService.addShippingAddress(data);
      const message = response.data?.msg || "Update successful";

      dispatch({
        type: ADD_SHIPPING_ADDRESS,
        payload: response.data.data,
      });
      toast(message);

      return Promise.resolve(message);
    } catch (err: any) {
      const message = err.response.data?.msg || "Update fail";
      toast(message);

      return Promise.reject(message);
    }
  };
}

export function updateShippingAddress(data: AddressProps["data"]) {
  return async (dispatch: any) => {
    try {
      const response = await UserService.updateShippingAddress(data);

      const message = response.data?.msg || "Update successful";

      dispatch({
        type: UPDATE_SHIPPING_ADDRESS,
        payload: response.data.data,
      });
      toast(message);

      return Promise.resolve(message);
    } catch (err: any) {
      const message = err.response.data?.msg || "Update fail";
      toast(message);

      return Promise.reject(message);
    }
  };
}

export function deleteShippingAddress(id: number) {
  return async (dispatch: any) => {
    try {
      const response = await UserService.deleteShippingAddress(id);
      const message = response.data?.msg || "Delete successful";

      dispatch({
        type: DELETE_SHIPPING_ADDRESS,
        payload: id,
      });
      toast(message);

      return Promise.resolve(message);
    } catch (err: any) {
      const message = err.response.data?.msg || "Delete fail";
      toast(message);

      return Promise.reject(message);
    }
  };
}
