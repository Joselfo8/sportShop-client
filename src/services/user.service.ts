import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL;

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

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
