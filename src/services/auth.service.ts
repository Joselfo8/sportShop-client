import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

function register(username: string, email: string, password: string) {
  return axios.post(API_URL + "/users", {
    username,
    email,
    password,
  });
}

async function login(email: string, password: string) {
  const response = await axios.post(API_URL + "/users/login", {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("auth", JSON.stringify(response.data));
  }

  return response.data;
}

function logout() {
  localStorage.removeItem("auth");
}

const auth = {
  register,
  login,
  logout,
};

export default auth;
