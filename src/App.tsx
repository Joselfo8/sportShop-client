import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import RouteGuard from "./components/RouteGuard";
import Home from "./components/Home/Home";
import Login from "./routes/Login";
import Details from "./components/Details/Details";
import Cart from "./components/Cart/Cart";
import Subcategory from "./components/Subcategory/Subcategory";
import Products from "./components/Products/Products";
import UserProfile from "./routes/UserProfile";
import About from "./components/About/About";
import Favorites from "./components/Favorites/Favorites";
import List from "./components/Admin/List/ListUser";
import HomeAdmin from "./components/Admin/home/HomeAdmin";
import AddProduct from "./components/Admin/Forms/AddProduct";
import Purchase from "./components/Purchase/Purchase";
import EditProduct from "./components/Admin/Forms/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}>
          <Route path=":register" element={<Login />} />
        </Route>
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/:category" element={<Subcategory />} />
        <Route path="/products" element={<Products />} />

        <Route path="/about" element={<About />} />

        {/* ADMIN */}
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/list" element={<List />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
      </Routes>
      {/* Notification component */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
