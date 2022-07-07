import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Components
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./routes/Login";
import Details from "./components/Details/Details";
import Cart from "./components/Cart/Cart";
import Man from "./components/Categories/Man";
import Woman from "./components/Categories/Woman";
import Shoes from "./components/Categories/Shoes";
import Clothing from "./components/Categories/Clothing";
import Accesories from "./components/Categories/accesories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home/:id" element={<Details />} />
        <Route path="/man" element={<Man />} />
        <Route path="/woman" element={<Woman />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/clothing" element={<Clothing />} />
        <Route path="/accesories" element={<Accesories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
