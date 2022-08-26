import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Components
import ListProduct from "../List/ListProduct";
import ListUser from "../List/ListUser";
import OrderList from "../List/OrderList";
// Store
import { isAdmin } from "redux/action/admin";
// Styles
import styles from "./HomeAdmin.module.css";

function HomeAdmin() {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    dispatch(isAdmin(token));
  }, [token, dispatch]);

  const admin: boolean = useSelector((state: any) => state.admin.isAdmin);
  const [getState, setState] = useState<Number>(0);

  function handleClik(e: any) {
    setState(e);
  }

  if (admin) {
    return (
      <div className={styles.HomeAdmin}>
        <div className={styles.containerButtons}>
          {getState === 1 ? (
            <button
              onClick={() => {
                handleClik(0);
              }}
              className="selected"
            >
              {" "}
              Products
            </button>
          ) : (
            <button
              onClick={() => {
                handleClik(1);
              }}
            >
              {" "}
              Products
            </button>
          )}
          {getState === 2 ? (
            <button
              onClick={() => {
                handleClik(0);
              }}
              className="selected"
            >
              Users
            </button>
          ) : (
            <button
              onClick={() => {
                handleClik(2);
              }}
            >
              Users
            </button>
          )}
          {getState === 3 ? (
            <button
              onClick={() => {
                handleClik(0);
              }}
              className="selected"
            >
              Purchases
            </button>
          ) : (
            <button
              onClick={() => {
                handleClik(3);
              }}
            >
              Purchases
            </button>
          )}
        </div>

        {getState === 1 ? <ListProduct /> : null}
        {getState === 2 ? <ListUser /> : null}
        {getState === 3 ? <OrderList /> : null}
      </div>
    );
  } else {
    return (
      <div className={styles.notAdmin}>
        <h1>You are not admin</h1>
        <Link to="/">
          <button>« Back home</button>
        </Link>
      </div>
    );
  }
}

export default HomeAdmin;
