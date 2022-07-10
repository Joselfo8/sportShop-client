import { useState } from "react";
import defaultImage from "../../assets/default-item-image.jpg";
// Styles
import styles from "./Orders.module.css";

function Item() {
  return (
    <div className={styles["item"]}>
      <dl className={`${styles["item-descrip"]} secondary`}>
        <div className={styles["item-wrapper"]}>
          <dt>Order date</dt>
          <dd>Apr 17, 2022</dd>
        </div>
        <div className={styles["item-wrapper"]}>
          <dt>Order number</dt>
          <dd>15-08520-83877</dd>
        </div>
        <div className={styles["item-wrapper"]}>
          <dt>Sold By</dt>
          <dd>Keystonememory</dd>
        </div>
        <div className={styles["item-wrapper"]}>
          <dt>Order total</dt>
          <dd>US $9.62</dd>
        </div>
      </dl>
      <div className={styles["item-info"]}>
        <div className={styles["image-cont"]}>
          <img src={defaultImage} alt="product title" />
        </div>
        <div className={styles["item-info-wrapper"]}>
          <span className={styles["item-title"]}>
            Orange shirt 2022 edition gold
          </span>
          <span className={styles["item-price"]}>Price: $8.99</span>
        </div>
      </div>

      <div className={`${styles["item-buttons"]} primary`}>
        <span className={styles["item-button"]}>View order details</span>
        <span className={styles["item-button"]}>View similar items</span>
        <span className={styles["item-span"]}>Cancel order</span>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>Orders</span>

        <div className={styles["buttons"]}>
          <label htmlFor="select-time">
            See orders from:
            <select id="select-time">
              <option value="30">Last 30 Days</option>
              <option value="60">Last 60 Days</option>
            </select>
          </label>
          <label htmlFor="select-page">
            Show
            <select id="select-page">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            per page
          </label>
        </div>
      </div>
      <div className={styles["info-wrapper"]}>
        <Item />
        <Item />
        <Item />
      </div>
    </>
  );
}

export default Orders;
