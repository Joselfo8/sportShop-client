import { toast } from "react-toastify";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER,
} from "./types";
import { setMessage } from "./message";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

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

      return Promise.reject(message);
    }
    const message = response.data?.msg || "Login successful";

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
    const response = await AuthService.login(email, password);

    if (!response.access) {
      const message = response?.msg || "Login fail";

      dispatch({
        type: LOGIN_FAIL,
      });

      toast(message);

      return Promise.reject(message);
    }

    const message = response?.msg || "Login successful";

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });

    toast(message);

    return Promise.resolve(message);
  };
}

export const logout = () => (dispatch: any) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

interface UpdateUserData {
  name: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  genre: string;
}

export function updateUser(userId: number, data: UpdateUserData) {
  return async (dispatch: any) => {
    const response = await UserService.updateUser(userId, data);

    if (!response.data.user) {
      const message = response.data?.msg || "Login fail";
      toast(message);

      return Promise.reject(message);
    }
    const message = response.data?.msg || "Login successful";

    dispatch({
      type: UPDATE_USER,
      payload: response.data.user,
    });

    toast(message);

    return Promise.resolve(message);
  };
}
