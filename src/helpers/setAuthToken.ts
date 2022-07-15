import axios from "axios";

function setAuthToken(token: string) {
  if (!token) {
    delete axios.defaults.headers.common["Authorization"];

    return;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default setAuthToken;
