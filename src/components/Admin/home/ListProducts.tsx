import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Navbar/Navbar";
import { useState } from "react";
import "./ListProducts.css";
import CardProduct from "./CardProduct";

export default function () {
  const [getState, setState] = useState({
    products: [
      {
        name: "ropa ejemplo",
        price: 100,
        description:
          "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        image: "https://m.media-amazon.com/images/I/51ySxiRTuhL._AC_SX522_.jpg",
      },
    ],
  });
  let product = {
    name: "ropa ejemplo",
    price: 100,
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    image: "https://m.media-amazon.com/images/I/51ySxiRTuhL._AC_SX522_.jpg",
  };

  function handlePress(e: any) {
    e.preventDefault();
    if (e.code === "Enter") {
      console.log(getState);
      setState({
        ...getState,
        products: getState.products.concat(product),
      });
    }
  }

  return (
    <div className="ListProducts">
      <div className="header">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Buscar Producto"
          onKeyUp={handlePress}
        />
      </div>
      <div className="containerCards">
        {getState.products.map((product: any) => (
          <div>
            <CardProduct data={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
