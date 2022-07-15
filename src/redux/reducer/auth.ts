import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../action/types";
const response = localStorage.getItem("auth");
const data = response !== null && JSON.parse(response);

const initialState = data
  ? { isLoggedIn: true, auth: data }
  : { isLoggedIn: false, auth: null };

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
    default:
      return state;
  }
}

export default auth;
