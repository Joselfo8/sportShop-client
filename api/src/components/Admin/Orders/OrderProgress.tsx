import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getOrderById, putStateToOrder, putTrackingNumber } from "../../../redux/action/admin"

// Components
import NavBar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

// Style
import style from "./OrderProgress.module.scss";


export default function OrderProgress() {
  const dispatch = useDispatch();
  const order = useSelector((state:any) => state.admin.order);

  console.log("order", order)

  let {orderId} = useParams();

  const [input, setInput] = useState({
    trackingNumber: '',
    changeStatus: '',
    selectState: '',
  })

  const [errors, setErrors] = useState({
    checked: 'Missing check or pack products according to request!',
    trackingNumber: 'You must enter the carrier tracking number!',
  })

  useEffect(() => {
    dispatch(getOrderById(orderId));
  },[]);

  // let quantityOfProducts: number = !order.id ? 0 : order.products.map((product: any) => (Number(Object.values(product.sizesAmount)))).reduce((a: any, b: any) => a + b)
  let quantityOfProducts: number = !order.id ? 0 : order.products.length

  function validate(data: any) {
    let errors: any = {}
  
    if (!data.trackingNumber) {
      errors.trackingNumber = 'Tracking number is required';
    } else if (/[^A-Za-z0-9]+/g.test(data.trackingNumber)) {
        errors.trackingNumber = 'Tracking number must not contain symbols or special characters';
    }
    
    if(data.checked.length === 0) {
      errors.checked = 'Missing check or pack products according to request!'
    }
    if(data.checked && data.checked.length !== quantityOfProducts) {
      errors.checked = 'Missing check or pack products according to request!++'
    }
  
    return errors;
  }
  

  const handleImputsChange = (event: any) => {
    setInput((inputState: any) => {
      return {
        ...inputState,
        [event.target.name]: event.target.value
      }
    })

    let errorsResult: any = validate({
      ...input,
      checked: [...checked],
      [event.target.name]: event.target.value
    })
    setErrors(errorsResult)
  }

  // ------------------------------ Checkbox ------------------------------ //

  const [checked, setChecked] = useState<string[]>([]);

  const handleCheck = (event: any) => {
    let updateElements: any = [...checked]

    if (event.target.checked === true) {
      updateElements = [...checked, event.target.value]
    } else {
      updateElements.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updateElements);

    let errorsResult: any = validate({
      ...input,
      checked: updateElements,
    })
    setErrors(errorsResult)
  }

  // ------------------------------ Submit ------------------------------ //


  const handleOnSubmit: any = (event: any) => {
    event.preventDefault()

    if(input.selectState === "Order ready" && unduplicatedStates.includes("Preparing order")) {
      return alert('First you should assign state "Preparing order"')
    }
    if(input.selectState === "Order ready" && errors.checked) {
      return alert("Missing check or pack products according to request!")
    }

    if(input.selectState === "Order is on its way" && unduplicatedStates.includes("Order ready")) {
      return alert("First you should check and pack products!")
    }
    if(input.selectState === "Order is on its way" && !order.delivery_number) {
      return alert("Carrier tracking number is required!")
    }

    if(input.selectState === "Order delivered" && unduplicatedStates.includes("Order is on its way")) {
      return alert("First you should save the shipping number!")
    }
    
    else {
      dispatch(putStateToOrder({
        id: orderId,
        status: input.selectState
      }))

      setInput((inputState: any) => {
        return {
          ...inputState,
          selectState: ""
        }
      })
      event.target.reset()
    }
    
  }

  const addTrackingNumber = (event: any) => {
    event.preventDefault();
    dispatch(putTrackingNumber({
      shoppingId: order.id,
      deliveryNumb: input.trackingNumber,
    }));
    event.target.reset()
}
  
  // ------------------------------ Render Select ------------------------------ //

  let possibleStates = ["Preparing order", "Order ready", "Order is on its way", "Order delivered"]
  let statusHistory = !order.status_history ? null : order.status_history.map((state: any) => state.status)
  
  const unduplicatedStates = !order.status_history ? [] : possibleStates.filter((state: any) => {
    if(statusHistory.includes(state) === false) return state
  })

  const rederSelectState = (
    !order.id
      ? <div>
          <h2>Loadding...</h2>
        </div>
      : <select name="selectState" id="orderType" onChange={(e) => {handleImputsChange(e)}}>
          <option> </option>
          {
            order.status_history.length === 0
              ? <></>
              : (
                unduplicatedStates.map((status: any) => {
                    return (
                      <option value={status}>{status}</option> 
                    )
                  })
                  
                )
          }
        </select>
  )
  
  
  const renderOrder = (
    !order.id
              ?   <div>
                      <h2>Loadding...</h2>
                  </div>
              :   (
                    <div className={style.grid}>


                      <div className={style.ordersContainer}>

                        <div className={style.orderBar}>

                          <div className={style.firstLine}>
                            <b>{`Order No. ${order.id}`}</b>
                            <p>{`Made on: ${order.date}`}</p>
                          </div>

                          <div className={style.secondLine}>
                            <p>{`Name: ${order.user.name} ${order.user.lastname}.`}</p>
                            <p>Quantity: <b>{`${`${quantityOfProducts} products`}`}</b></p>
                          </div>
                                    
                        </div>

                        <div className={style.orderStatusContainer}>

                          <h2 className={style.textCenter}> {order.status_history[order.status_history.length-1].status}</h2>
                          <p className={style.textCenter}>{order.status_history[order.status_history.length-1].date}</p>
                          
                          <div className={style.orderStatusHistory}>
                            <div className={style.subtitle}>
                              <h3>ORDER STATUS HISTORY</h3>
                            </div>
                            
                            {
                              order.status_history.length === 0
                                ? <></>
                                : (
                                    order.status_history.map((status: any) => {
                                      return (
                                        <div className={style.textInRow}>
                                          <p>{status.date}</p>
                                          <b>{status.status}</b>
                                        </div> 
                                      )
                                    })
                                    
                                  )
                            }
                            
                          </div>
                          
                        </div>

                        <div className={style.productsPrepareContainer}>
                          <div className={style.subtitle}>
                            <h3>PRODUCTS TO PREPARE</h3>
                          </div>


                          <div className={style.containerOfPurchasedProducts}>

                            
                            <div className={style.gridBar}>

                              <div className={style.textInitial}>
                                <b>PRODUCT</b>
                              </div>

                              <div className={style.textSpaceBetween}>
                                <b>Units</b>
                                <b>Check</b>
                              </div>

                            </div>

                            {
                              order.products.length === 0
                                ? <></>
                                : (
                                    order.products.map((product: any) => {
                                      return (
                                        <div className={style.productsContainer} key={product.id}>

                                          <div className={style.productDetail}>

                                            <div className={style.flagContainer}>
                                              <img className={style.flag} src={product.image} alt={product.title} />
                                            </div>

                                            <div className={style.detail}>
                                              <p>{`Brand: ${"AGREGAR MARCA"}`}</p>
                                              <p>{product.title}</p>
                                              <p>{`Size: ${Object.keys(product.sizesAmount)}`}</p>
                                            </div>

                                          </div>

                                          <div className={style.productPrice}>

                                            <div className={style.amount}>
                                              <p>{`${Object.values(product.sizesAmount)}`}</p>
                                            </div>

                                            <div className={style.checkbox}>
                                              <p>
                                                <label htmlFor={product.id}></label>
                                                <input 
                                                  type="checkbox" 
                                                  value={product.id}
                                                  // checked={unduplicatedStates.includes("Order ready") ? false : true}
                                                  disabled={unduplicatedStates.includes("Order ready") ? false : true}
                                                  onChange={handleCheck} 
                                                />
                                              </p>
                                            </div>

                                          </div>

                                        </div>
                                      )
                                    })
                                    
                                  )
                            }


                          </div>


                        </div>


                        <div className={style.deliveryContainer}>

                          <div className={style.subtitle}>
                            <h3>PRODUCT DELIVERY</h3>
                          </div>

                          <div className={style.shippingContainer}>
                            
                              <div className={style.shipmentInformation}>

                                <div className={style.subSubTitle}>
                                  <b>Shipment information</b>
                                </div>

                                <div className={style.textSymple}>
                                  <p>{`Recipient name: ${order.receiver}`}</p>
                                  <p>{`Direction: ${order.direction}`}</p>
                                  <p>{`City / state: ${order.city}, ${order.state}`}.</p>  
                                  <p>{`Country: ${order.country}`}</p>
                                </div>

                              </div>

                              <div className={style.deliveryInformation}>

                                <div className={style.subSubTitle}>
                                  <b>Delivery information</b>
                                </div>

                                <div className={style.textSymple}>
                                  <p>{`Carrier tracking number: ${order.delivery_number}`}</p>
                                  <div className={style.flexForm}>
                                  <form action="" id="orderNumber" onSubmit={(e) => addTrackingNumber(e)}>
                                      <input 
                                        name="trackingNumber"
                                        placeholder='Enter tracking number...'
                                        disabled={ !order.delivery_number ? false : true}
                                        onChange={(e) => handleImputsChange(e)} 
                                      />
                                    <button>Add</button>
                                    </form>
                                  </div>
                                </div>

                                {/* <div className={style.proofContainer}>
                                  <p>Proof of delivery</p>
                                  <button>Upload</button>
                                </div> */}

                              </div>


                          </div>

                          <div className={style.checkedPacked}>
                            <b>Change state</b>
                            <form name="stateForm" className={style.selectState} onSubmit={(e) => {handleOnSubmit(e)}} >
                              {
                                rederSelectState
                              }
                              <button>Set</button>
                            </form>

                            <Link to={`/admin/order-detail/${order.id}`} style={{textDecoration:"none"}}>
                              <button className={style.button}>View detail</button>
                            </Link>
                          </div>

                        </div>

                        

                      </div>
                    
                    
                    
                    </div>
                  )
  )

  
  return (
    <div>
      <NavBar />

      <div className={style.linkContainer}>
        <div className={style.textArea}>
          <Link to="/admin/" className={style.link}>
            <p>{`> Back to admin menu`}</p>
          </Link>
        </div>
      </div>

      {renderOrder}

      <br />

      <Footer />
    </div>
  );
}