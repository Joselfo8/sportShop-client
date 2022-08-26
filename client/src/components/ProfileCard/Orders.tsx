import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../assets/default-item-image.jpg";
// Store
import { getUserOrders } from "redux/action/user";
// Components
import Select from "../Select";
// Styles
import styles from "./Orders.module.css";

function Item() {
  // Store
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.user?.orders);

  // useEffect(() => {
  //   if (orders.length === 0) dispatch(getUserOrders());
  // }, [orders, dispatch]);

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

interface SelectedVal {
  label: string;
  value: string;
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
  const [selected, setSelected] = useState<{
    time: string;
    page: string;
  }>({ time: "", page: "" });

  const handleChange = (value: SelectedVal | null, id: string) => {
    setSelected((prev) => ({ ...prev, [id]: value?.value }));
  };

  // set selected tab by default
  useEffect(() => {
    if (selected.time.length === 0)
      setSelected({ time: timeOptions[0].value, page: pageOptions[0].value });
  }, [selected, setSelected]);

  return (
    <>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>Orders</span>
        <div className={styles["buttons"]}>
          <label className="dark" htmlFor="select-time">
            See orders from:
            <Select
              options={timeOptions}
              defaultValue={timeOptions[0]}
              width="9rem"
              margin="0 0.5rem"
              onChange={(value) => handleChange(value, "time")}
            />
          </label>
          <label htmlFor="select-page">
            Show
            <Select
              options={pageOptions}
              defaultValue={pageOptions[0]}
              width="fit-content"
              margin="0 0.5rem"
              onChange={(value) => handleChange(value, "page")}
            />
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
