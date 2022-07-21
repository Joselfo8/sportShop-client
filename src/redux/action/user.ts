import { toast } from "react-toastify";
import { UPDATE_USER, UPDATE_SHIPPING_ADDRESS } from "redux/action/types";
import UserService from "services/user.service";
// Interfaces
import { InfoProps } from "components/ProfileCard/UserInfo";
import { AddressProps } from "components/ProfileCard/UserInfo";

export function updateUser(id: InfoProps["id"], data: InfoProps["data"]) {
  return async (dispatch: any) => {
    const response = await UserService.updateUser(id, data);

    if (!response.data.data) {
      const message = response.data?.msg || "Update fail";
      toast(message);

      return Promise.reject(message);
    }
    const message = response.data?.msg || "Update successful";

    dispatch({
      type: UPDATE_USER,
      payload: response.data.data,
    });

    toast(message);

    return Promise.resolve(message);
  };
}

export function updateShippingAddress(data: AddressProps["data"]) {
  return async (dispatch: any) => {
    const response = await UserService.updateShippingAddress(data);

    if (!response.data.data) {
      const message = response.data?.msg || "Update fail";
      toast(message);

      return Promise.reject(message);
    }
    const message = response.data?.msg || "Update successful";

    dispatch({
      type: UPDATE_SHIPPING_ADDRESS,
      payload: response.data.data,
    });

    toast(message);

    return Promise.resolve(message);
  };
}
