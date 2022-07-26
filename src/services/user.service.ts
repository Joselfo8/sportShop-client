import axios from "axios";
// Interfaces
import { InfoProps } from "components/ProfileCard/UserInfo";
import { AddressProps } from "components/ProfileCard/UserInfo";
// Env
const API_URL = process.env.REACT_APP_API_URL;

async function getUser() {
  return await axios.get(`${API_URL}/users/data`);
}

async function updateUser(data: InfoProps["data"]) {
  const { email: _, ...req } = data;
  return await axios.put(`${API_URL}/users`, req);
}

async function addShippingAddress(data: AddressProps["data"]) {
  return await axios.post(`${API_URL}/users/address`, data);
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
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getUserOrders,
};

export default user;
