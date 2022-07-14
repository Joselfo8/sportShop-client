import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import AuthService from "../../services/auth.service";

export async function register(
  username: string,
  email: string,
  password: string
) {
  return async (dispatch: any) => {
    try {
      const response = await AuthService.register(username, email, password);

      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  };
}

export async function login(username: string, password: string) {
  return async (dispatch: any) => {
    try {
      const response = await AuthService.login(username, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response },
      });

      return Promise.resolve();
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  };
}

export const logout = () => (dispatch: any) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
