import { SET_MESSAGE, CLEAR_MESSAGE } from "../action/types";

const initialState = "";

function message(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return payload;
    case CLEAR_MESSAGE:
      return "";
    default:
      return state;
  }
}

export default message;
