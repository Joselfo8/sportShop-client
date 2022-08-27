import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import Navbar from "components/Navbar";
import Footer from "components/Footer";
// Routes
import Home from "routes/Home";
import Login from "routes/Login";
import Details from "routes/Details";
import Cart from "routes/Cart";
import Subcategory from "routes/Subcategory";
import UserProfile from "routes/UserProfile";
import About from "routes/About";
import Favorites from "routes/Favorites";
import Purchase from "routes/Purchase";
import ProductsFilter from "routes/ProductsFilter";
import UserOrder from "routes/UserOrder";
import UserOrderList from "routes/UserOrderList";
// Admin
// import List from "Admin/List/ListUser";
// import HomeAdmin from "Admin/home/HomeAdmin";
// import AddProduct from "Admin/Forms/AddProduct";
// import EditProduct from "Admin/Forms/EditProduct";
// import Order from "Admin/Orders/Order";
// import OrderProgress from "Admin/Orders/OrderProgress";
// import Stock from "Admin/Stock/Stock";
// Helpers
import setAuthToken from "helpers/setAuthToken";

function App() {
  // set JWT token in all request
  setAuthToken();

  return (
    <div translate="no">
      <BrowserRouter basename="vlixes">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}>
            <Route path=":register" element={<Login />} />
          </Route>
          {/* User */}
          <Route path="/user/order-detail/:id" element={<UserOrder />} />
          <Route path="/user/order-list" element={<UserOrderList />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/:category" element={<Subcategory />} />
          <Route path="/products/:id" element={<Details />} />
          <Route path="/about" element={<About />} />

          {/* Products Filter */}
          <Route path="/:category/:subCaegory" element={<ProductsFilter />} />
          <Route path="/search" element={<ProductsFilter />} />

          {/* Admin */}
          {/* <Route path="/admin" element={<HomeAdmin />} /> */}
          {/* <Route path="/admin/list" element={<List />} /> */}
          {/* <Route path="/admin/addProduct" element={<AddProduct />} /> */}
          {/* <Route path="/admin/order-detail/:id" element={<Order />} /> */}
          {/* <Route */}
          {/*   path="/admin/order-progress/:orderId" */}
          {/*   element={<OrderProgress />} */}
          {/* /> */}
          {/* <Route path="/stock/:id" element={<Stock />} /> */}
          {/* <Route path="admin/editProduct/:id" element={<EditProduct />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
