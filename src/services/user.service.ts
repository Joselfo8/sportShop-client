import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL;

interface UpdateUserData {
  name: string;
  lastname: string;
  dateOfBirth: string;
  genre: string;
}

async function updateUser(userId: number, data: UpdateUserData) {
  // return await axios.put(API_URL + "/users", { ...info }, { headers: authHeader() });
  return await axios.put(`${API_URL}/users/${userId}`, data);
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
