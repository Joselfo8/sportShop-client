import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import Home from "./components/Home/Home";
import Login from "./routes/Login";
import Details from "./components/Details/Details";
import Cart from "./components/Cart/Cart";
import Subcategory from "./components/Subcategory/Subcategory";
import UserProfile from "./routes/UserProfile";
import About from "./components/About/About";
import Favorites from "./components/Favorites/Favorites";
import List from "./components/Admin/List/ListUser";
import HomeAdmin from "./components/Admin/home/HomeAdmin";
import AddProduct from "./components/Admin/Forms/AddProduct";
import Purchase from "./components/Purchase/Purchase";
import EditProduct from "./components/Admin/Forms/EditProduct";
import Order from "./components/Admin/Orders/Order";
import ProductFilter from "components/productFilter/ProductFilter";
import OrderProgress from "components/Admin/Orders/OrderProgress";
import Stock from "components/Admin/Stock/Stock";
import UserOrder from "components/UserOrder/UserOrder";
import UserOrderList from "components/UserOrder/UserOrderList";
// Helpers
import setAuthToken from "helpers/setAuthToken";

//BOT
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import styles from "./scss/app.module.scss"
import config from './components/Bot/config';
import MessageParser from './components/Bot/MessageParser';
import ActionProvider from './components/Bot/ActionProvider';
import { FaRobot } from "react-icons/fa";

function App() {
  const [chatBot, setChatBot] = useState(false);
  const handleShow = () => {
    setChatBot(
      !chatBot
    );
  };
  
  // set JWT token in all request
  setAuthToken();

  return (
    <div translate="no">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}>
            <Route path=":register" element={<Login />} />
          </Route>
          {/* USER */}
          <Route path="/user/order-detail/:id" element={<UserOrder />} />
          <Route path="/user/order-list" element={<UserOrderList />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/:category" element={<Subcategory />} />
          <Route path="/products/:id" element={<Details/>}/>
          <Route path="/about" element={<About />} />

          {/* FILTRADO DE PRODUCTOS */}
          <Route path="/:category/:subCaegory" element={<ProductFilter />} />
          <Route path="/search" element={<ProductFilter />} />

          {/* ADMIN */}
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/list" element={<List />} />
          <Route path="/admin/addProduct" element={<AddProduct />} />
          <Route path="/admin/order-detail/:id" element={<Order />} />
          <Route path="/admin/order-progress/:orderId" element={<OrderProgress />} />
          <Route path="/stock/:id" element={<Stock/>} />
          <Route path="admin/editProduct/:id" element={<EditProduct />} />
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

        {/* ChatBot */}
      <div className={styles.chatbot1}>
        { chatBot ?
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          /> :
          <></>
        }
          <FaRobot className={styles.show} onClick={handleShow}>BOT</FaRobot>
      </div>

      </BrowserRouter>
    </div>
  );
};

export default App;
