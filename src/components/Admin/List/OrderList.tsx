import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/action/admin"
import { Link } from "react-router-dom";

import styles from "./OrderList.module.scss"

export default function OrderList(){
    const dispatch = useDispatch();
    const orders = useSelector((state:any) => state.admin.orders);
    useEffect(() => {
        dispatch(getOrders());
    },[]);

    const render = (
        orders.length === 0
                    ?   <div>
                            <h2>No orders</h2>
                        </div>
                    :   (
                        orders.map((order: any) => {
                            return (
                                <div className={styles.order} key={order.id}>
                                    <b>{`Order No. ${order.id}`}</b>
                                    <p>{`Creation date: ${order.status_history[order.status_history.length-1].date}`}</p>
                                    <p>{`State: `} <b>{`${order.status_history[order.status_history.length-1].status}`}</b> </p>
                                    <Link to={`/admin/orders/${order.id}`} style={{textDecoration:"none"}}>
                                        <button className={styles.button}>View detail</button>
                                    </Link>
                                </div>
                                )
                            })
                        
                        )
    )
        
    return(
        <div className={styles.container}>

            <div>
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