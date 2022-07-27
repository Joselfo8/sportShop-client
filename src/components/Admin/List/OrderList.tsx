import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/action/admin"
import { Link } from "react-router-dom";

import style from "./OrderList.module.scss"

export default function OrderList(){
    const dispatch = useDispatch();
    const orders = useSelector((state:any) => state.admin.orders.buys);
    console.log(orders)

    useEffect(() => {
        dispatch(getOrders("?page=1&limit=30"));
    },[]);

    function filterByState(event: any) {
        console.log("desde function orders", event.target.value)
        // dispatch(orderCountries(event.target.value))
        // document.getElementById(event.target.id).selectedIndex = 0
    }

    const render = (
        !orders
                    ?   <div>
                            <h2>No orders</h2>
                        </div>
                    :   (
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
                                        <p>{`State: `} <b>{`${order.status_actual.status}`}</b> </p>
                                    </div>
                                    <Link to={`/admin/order-progress/${order.buy_id}`} style={{textDecoration:"none"}}>
                                        <button className={style.button}>Work in</button>
                                    </Link>
                                </div>
                                )
                            })
                        
                        )
    )
        
    return(
        <div className={style.container}>

            <div>
                {
                <div className={style.selectState}>
                    <label htmlFor="">Filter by state</label>
                    <select name="orderType" id="orderType" onChange={(e) => {filterByState(e)}}>
                      <option> </option>
                      <option value="Preparing">Preparing order</option>
                      <option value="OrderReady">Order ready</option>
                      <option value="OrderIsOnItsWay">Order is on its way</option>
                      <option value="OrderDelivered">Order delivered</option>
                    </select>
                </div>
                }
                {/* <input/>
                {   allProducts &&
                    allProducts.map((e:any) => {
                        return <CardList title={e.title} id={e.id} category={e.category} image={e.image}/>
                    })
                } */}
            </div>

            <div>
                { render }
            </div>

        </div>
    );
};