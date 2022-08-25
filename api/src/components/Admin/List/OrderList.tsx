import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getOrdersById, getOrdersByState } from "../../../redux/action/admin"
import { Link } from "react-router-dom";

import style from "./OrderList.module.scss"

function validate(input: any) {
    let errors = {};
    console.log("validate", input)

    if (typeof input.orderNumber !== 'number') {
        errors = 'Debe ser un numero';
    }
    
    return errors;
};

export default function OrderList(){
    const dispatch = useDispatch();
    const orders = useSelector((state:any) => state.admin.orders.buys);
    const state = useSelector((state:any) => state.admin);
    
    const [input, setInput] = useState({
        orderNumber: ''
    })
    const [errors, setErrors] = useState({
        orderNumber: ''
    })
    

    useEffect(() => {
        dispatch(getOrders("?page=1&limit=30"));
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

            <div className={style.filterContainer} >
                
                <div className={style.findOrderById}>
                    <form action="" id="orderNumber" onSubmit={(e) => findOrderById(e)}>
                        <input
                            name="orderNumber"
                            placeholder='Enter order number...'
                            onChange={(e) => handleImputsChange(e)}
                        />
                        {errors.orderNumber && ( <label className={style.errors}>{errors.orderNumber}</label> )}
                        {/* <button onClick={() => {findOrderById()}}>Search</button> */}
                        <button>Search</button>
                    </form>
                </div>

                {
                <div className={style.selectState}>
                    <p>Filter by state: </p>
                    <select name="orderType" id="orderType" onChange={(e) => {filterByState(e)}}>
                      <option> </option>
                      <option value="created order">Created order</option>
                      <option value="Preparing order">Preparing order</option>
                      <option value="Order ready">Order ready</option>
                      <option value="Order is on its way">Order is on its way</option>
                      <option value="Order delivered">Order delivered</option>
                    </select>
                </div>
                }
                

            </div>

            <div>
                { render }
            </div>

        </div>
    );
};