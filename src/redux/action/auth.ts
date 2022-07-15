import { toast } from "react-toastify";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import AuthService from "../../services/auth.service";

export async function register(
  name: string,
  lastname: string,
  email: string,
  password: string
) {
  return async (dispatch: any) => {
    const response = await AuthService.register(
      name,
      lastname,
      email,
      password
    );

    if (!response.data.user) {
      const message = response.data?.msg || "Login fail";

      dispatch({
        type: REGISTER_FAIL,
      });

      toast(message);

      return Promise.reject();
    }
    const message = response.data?.msg || "Login successful";

    dispatch({
      type: REGISTER_SUCCESS,
    });

    toast(message);

    return Promise.resolve();
  };
}

export async function login(email: string, password: string) {
  return async (dispatch: any) => {
    const response = await AuthService.login(email, password);

    if (!response.access) {
      const message = response.message || "Login fail";

      dispatch({
        type: LOGIN_FAIL,
      });

      toast(message);

      return Promise.reject(message);
    }

    const message = response.message || "Login successful";

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });

    toast(message);

    return Promise.resolve();
  };
}

export const logout = () => (dispatch: any) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
