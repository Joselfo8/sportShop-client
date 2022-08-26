import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

function register(
  name: string,
  lastname: string,
  email: string,
  password: string
) {
  return axios.post(API_URL + "/users", {
    name,
    lastname,
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
    localStorage.setItem("auth", JSON.stringify(response.data.token));
  }

  return response;
}

function logout() {
  localStorage.removeItem("auth");
}

function passwordRecovery(email: string) {
  return axios.post(API_URL + "/mailer/password-recovery", {
    email,
  });
}

const auth = {
  register,
  login,
  logout,
  passwordRecovery,
};

export default auth;
