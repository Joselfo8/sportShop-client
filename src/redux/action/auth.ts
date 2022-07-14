import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import AuthService from "../../services/auth.service";

export function register(username: string, email: string, password: string) {
  return async (dispatch: any) => {
    const response = await AuthService.register(username, email, password);

    // manage error
    // if (response.error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   dispatch({
    //     type: REGISTER_FAIL,
    //   });
    //   dispatch({
    //     type: SET_MESSAGE,
    //     payload: message,
    //   });
    //   return Promise.reject();
    // }

    dispatch({
      type: REGISTER_SUCCESS,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  };
}

export function login(username: string, password: string) {
  return async (dispatch: any) => {
    const response = await AuthService.login(username, password);
    // manage error
    // (error) => {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   dispatch({
    //     type: LOGIN_FAIL,
    //   });
    //   dispatch({
    //     type: SET_MESSAGE,
    //     payload: message,
    //   });
    //   return Promise.reject();
    // }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: response },
    });

    return Promise.resolve();
  };
}

export const logout = () => (dispatch: any) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
