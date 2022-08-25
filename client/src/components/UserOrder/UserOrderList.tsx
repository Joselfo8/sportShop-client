import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getOrdersById, getOrdersByState } from "../../redux/action/admin"
import { getUserOrders } from '../../redux/action/user'
import { Link } from "react-router-dom";
import NavBar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

import style from "./UserOrderList.module.scss"

function validate(input: any) {
    let errors = {};
    console.log("validate", input)

    if (typeof input.orderNumber !== 'number') {
        errors = 'Debe ser un numero';
    }
    
    return errors;
};

export default function UserOrderList(){
    const dispatch = useDispatch();
    const orders = useSelector((state:any) => state.user.orders);
    
    const [input, setInput] = useState({
        orderNumber: ''
    })
    const [errors, setErrors] = useState({
        orderNumber: ''
    })
    
    useEffect(() => {
        dispatch(getUserOrders())
    },[]);

    function filterByState(event: any) {


        dispatch(getOrdersByState(event.target.value))
    }

    const handleImputsChange = (event: any) => {
        setInput((input: any) => {
          return {
            ...input,
            [event.target.name]: Number(event.target.value)
          }
        })
    
        let errorsResult: any = validate({
            ...input,
            [event.target.name]: Number(event.target.value)
        })
        setErrors(errorsResult)
    }


    const findOrderById = (event: any) => {
        event.preventDefault();
        dispatch(getOrdersById(input.orderNumber));
        event.target.reset()
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
                                    <Link to={`/user/order-detail/${order.buy_id}`} style={{textDecoration:"none"}}>
                                        <button className={style.button}>Detail</button>
                                    </Link>
                                </div>
                                )
                            })
                        
                        )
    )
        
    return(
        <div>
            <NavBar/>

            <div className={style.container}>
                <div className={style.titleOrders}>
                    <h3>My orders</h3>
                </div>

                <div>
                    { render }
                </div>

            </div>

            <Footer/>
        </div>
    );
};