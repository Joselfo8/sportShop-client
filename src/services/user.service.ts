import axios from "axios";
// Interfaces
import { InfoProps } from "components/ProfileCard/UserInfo";
import { AddressProps } from "components/ProfileCard/UserInfo";
// Env
const API_URL = "https://vlixes-server.herokuapp.com";

async function getUser() {
  return await axios.get(`${API_URL}/users`);
}

async function updateUser(data: InfoProps["data"]) {
  const { email: _1, avatar: _2, ...req } = data;
  return await axios.put(`${API_URL}/users`, req);
}

async function updateAvatar(data: { avatar: string }) {
  return await axios.put(`${API_URL}/users/avatar`, data);
}

async function deleteAvatar() {
  return await axios.delete(`${API_URL}/users/avatar`);
}

async function addShippingAddress(data: AddressProps["data"]) {
  const { id: _, ...req } = data;
  return await axios.post(`${API_URL}/users/address`, req);
}

async function updateShippingAddress(data: AddressProps["data"]) {
  const { id, ...req } = data;
  return await axios.put(`${API_URL}/users/address/${id}`, req);
}

async function deleteShippingAddress(id: AddressProps["data"]["id"]) {
  return await axios.delete(`${API_URL}/users/address/${id}`);
}

async function getUserOrders() {
  return await axios.get(`${API_URL}/users/orders`);
}

const user = {
  getUser,
  updateUser,
  updateAvatar,
  deleteAvatar,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getUserOrders,
};

export default user;
