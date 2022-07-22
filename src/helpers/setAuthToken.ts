import axios from "axios";

function setAuthToken() {
  const data = localStorage.getItem("auth");
  const token = data !== null && JSON.parse(data);

  if (!token) {
    delete axios.defaults.headers.common["Authorization"];
    return;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default setAuthToken;
