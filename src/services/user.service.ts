import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL;

interface UpdateUserInfo {
  name: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  genre: string;
}

async function updateUser(userId: number, info: UpdateUserInfo) {
  // return await axios.put(API_URL + "/users", { ...info }, { headers: authHeader() });
  return await axios.put(API_URL + "/users", { id: userId, ...info });
}

function getPublicContent() {
  return axios.get(API_URL + "all");
}

function getUserBoard() {
  return axios.get(API_URL + "user", { headers: authHeader() });
}

function getModeratorBoard() {
  return axios.get(API_URL + "mod", { headers: authHeader() });
}

function getAdminBoard() {
  return axios.get(API_URL + "admin", { headers: authHeader() });
}

const user = {
  updateUser,
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default user;
