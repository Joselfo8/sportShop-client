import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import CardList from "./CardList";
import Paginated from "./Paginated";
// Store
import { getProductsByName, getAllProducts } from "redux/action/admin";
// Styles
import styles from "./List.module.css";

export default function ListProduct() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => {
    return {
      products: state.admin.products.products,
    };
  });
  const [value, setValue] = useState("");
  const typeList = "PRODUCT";

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  function handleChange(event: any) {
    setValue(event);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    dispatch(getProductsByName(value));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="search"
          type="text"
          placeholder="Search"
          id="searchProducts"
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>
      <Paginated />
      {state.products?.map((e: any, index: any) => {
        return (
          <CardList
            key={index}
            title={e.title}
            id={e.id}
            category={e.category}
            image={e.image}
            type={typeList}
          />
        );
      })}
    </div>
  );
}
