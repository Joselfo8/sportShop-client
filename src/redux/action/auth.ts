import { toast } from "react-toastify";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import setAuthToken from "helpers/setAuthToken";
import { setMessage } from "./message";
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
      const message = response.data?.msg || "Register fail";

      dispatch({
        type: REGISTER_FAIL,
      });

      toast(message);

      return Promise.reject(message);
    }
    const message = response.data?.msg || "Register successfully";

    dispatch({
      type: REGISTER_SUCCESS,
    });
    dispatch(setMessage("registered"));

    toast(message);

    return Promise.resolve(message);
  };
}

export async function login(email: string, password: string) {
  return async (dispatch: any) => {
    try {
      const response = await AuthService.login(email, password);
      const message = response.data?.msg || "Login successfully";

      // add JWT token to all request
      setAuthToken();

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token,
      });
      toast(message);

      return Promise.resolve(message);
    } catch (err: any) {
      const message = err.response.data?.msg || "Login fail";

      dispatch({
        type: LOGIN_FAIL,
      });

      toast(message);

      return Promise.reject(message);
    }
  };
}

export const logout = () => (dispatch: any) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });

  toast("Logout successfully");
};
