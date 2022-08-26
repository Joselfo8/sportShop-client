import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Store
import { getUserOrders } from "redux/action/user";
import { Link } from "react-router-dom";
// Components
import NavBar from "components/Navbar";
import Footer from "components/Footer";
// Styles
import style from "./UserOrderList.module.css";

function UserOrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.user.orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const render = !orders ? (
    <div>
      <h2>No orders</h2>
    </div>
  ) : (
    orders.map((order: any) => {
      return (
        <div className={style.order} key={order.buy_id}>
          <div className={style.orderNumber}>
            <b>{`Order No. ${order.buy_id}`}</b>
          </div>
          <div className={style.orderDate}>
            <p>{`Creation date: ${order.status_actual.date}`}</p>
          </div>
          <div className={style.orderStatus}>
            <p>
              {`State: `} <b>{`${order.status_actual.status}`}</b>{" "}
            </p>
          </div>
          <Link
            to={`/user/order-detail/${order.buy_id}`}
            style={{ textDecoration: "none" }}
          >
            <button className={style.button}>Detail</button>
          </Link>
        </div>
      );
    })
  );

  return (
    <>
      <NavBar />

      <div className={style.container}>
        <div className={style.titleOrders}>
          <h3>My orders</h3>
        </div>

        <div>{render}</div>
      </div>

      <Footer />
    </>
  );
}

export default UserOrderList;
