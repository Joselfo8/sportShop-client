import { useState } from "react";
import defaultImage from "../../assets/default-item-image.jpg";
// Components
import Select from "../Select";
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
  const timeOptions = [
    { value: "30", label: "Last 30 days" },
    { value: "60", label: "Last 60 days" },
  ];
  const pageOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
  ];

  return (
    <>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>Orders</span>
        <div className={styles["buttons"]}>
          <label className="dark" htmlFor="select-time">
            See orders from:
            <Select options={timeOptions} />
          </label>
          <label htmlFor="select-page">
            Show
            <Select options={pageOptions} />
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
