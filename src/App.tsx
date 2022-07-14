import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Components
import RouteGuard from "./components/RouteGuard";
import Home from "./components/Home/Home";
import Login from "./routes/Login";
import Details from "./components/Details/Details";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Subcategory from "./components/Subcategory/Subcategory";
import Products from "./components/Products/Products";
import UserProfile from "./routes/UserProfile";
import About from "./components/About/About";
import Favorites from "./components/Favorites/Favorites";

import List from "./components/Admin/List/List";
import HomeAdmin from "./components/Admin/home/HomeAdmin";

import Purchase from "./components/Purchase/Purchase";
// Helpers
import setAuthToken from "./helpers/setAuthToken";

function App() {
  // check JWT token
  const token = localStorage.getItem("token");

  if (token) setAuthToken(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}>
          <Route path=":register" element={<Login />} />
        </Route>
        <Route
          path="/user/profile"
          element={<RouteGuard outlet={<UserProfile />} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/:category" element={<Subcategory />} />
        <Route path="/products" element={<Products />} />

        <Route path="/about" element={<About />} />

        {/* ADMIN */}
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
