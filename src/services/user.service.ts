import axios from "axios";
import authHeader from "./auth-header";
// Interfaces
import { InfoProps } from "components/ProfileCard/UserInfo";
import { AddressProps } from "components/ProfileCard/UserInfo";
// Env
const API_URL = process.env.REACT_APP_API_URL;

async function updateUser(id: InfoProps["id"], data: InfoProps["data"]) {
  const { email: _, ...req } = data;
  return await axios.put(`${API_URL}/users/${id}`, req);
}

async function addShippingAddress(userId: number, data: AddressProps["data"]) {
  const { id: _, ...req } = data;
  return await axios.post(`${API_URL}/users/${userId}/address`, req);
}

async function updateShippingAddress(data: AddressProps["data"]) {
  const { id, ...req } = data;
  return await axios.put(`${API_URL}/users/address/${id}`, req);
}

async function deleteShippingAddress(id: AddressProps["data"]["id"]) {
  return await axios.delete(`${API_URL}/users/address/${id}`);
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
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default user;
