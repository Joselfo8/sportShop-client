import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getOrderById } from "../../../redux/action/admin"

// Components
import NavBar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

// Style
import style from "./Order.module.scss";

export default function Order() {
  const dispatch = useDispatch();
  const order = useSelector((state:any) => state.admin.order);

  const state = useSelector((state:any) => state);
  // console.log("state", state)

  console.log("ORDER", order)
  // console.log("PRUEBA", (Number(Object.values(order.products[2].sizesAmount))))

  let {id} = useParams();

  useEffect(() => {
    dispatch(getOrderById(id));
  },[]);

  let total: number = !order.id ? 0 : (order.sub_total + order.taxes + order.send_cost)
  let quantityOfProducts: number = !order.id ? 0 : order.products.map((product: any) => (Number(Object.values(product.sizesAmount)))).reduce((a: any, b: any) => a + b)
  
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
                              <p>Order Total:<b>{` $ ${total.toFixed(2)}`}</b></p>
                            </div>

                            <div className={style.secondLine}>
                              <p>{`Name: ${order.user.name} ${order.user.lastname}.`}</p>
                              <p>Quantity: <b>{`${`${quantityOfProducts} products`}`}</b></p>
                            </div>
                                      
                          </div>

                          <div className={style.orderStatusContainer}>

                            <h2 className={style.textCenter}> {order.status_history[order.status_history.length-1].status}</h2>
                            {/* <h2 className={style.textCenter}>delivery status graph</h2> */}
                            {/* <Graphic/> */}
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

                          <div className={style.purchaseContainer}>
                            <div className={style.subtitle}>
                              <h3>PURCHASED PRODUCTS</h3>
                            </div>


                            <div className={style.containerOfPurchasedProducts}>

                              
                              <div className={style.gridBar}>

                                <div className={style.textInitial}>
                                  <b>PRODUCT</b>
                                </div>

                                <div className={style.textSpaceBetween}>
                                  <b>Value</b>
                                  <b>Amount</b>
                                  <b>Subtotal</b>
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
                                                <b>{`Brand: ${"AGREGAR MARCA"}`}</b>
                                                <p>{product.title}</p>
                                                <p>{`Size: ${Object.keys(product.sizesAmount)}`}</p>
                                              </div>

                                            </div>

                                            <div className={style.productPrice}>

                                              <div className={style.cost}>
                                                <p>{`$ ${product.price}`}</p>
                                              </div>

                                              <div className={style.amount}>
                                                <p>{`${Object.values(product.sizesAmount)}`}</p>
                                              </div>

                                              <div className={style.Subtotal}>
                                                <p>{`$ ${product.price * Number(Object.values(product.sizesAmount))}`}</p>
                                              </div>

                                            </div>

                                          </div>
                                        )
                                      })
                                     
                                    )
                              }
                              

                              <div className={style.resume}>
                                
                                <div className={style.valueContainer}>
                                
                                  <div className={style.textInRow}>
                                    <p>{`Subtotal (${quantityOfProducts} products):`}</p>
                                    <p>{`$ ${order.sub_total}`}</p>
                                  </div>
                                
                                  <div className={style.textInRow}>
                                    <p>Shipping cost</p>
                                    <p>{`$ ${order.send_cost}`}</p>
                                  </div>

                                  <div className={style.textInRow}>
                                    <p>Taxes</p>
                                    <p>{`$ ${order.taxes.toFixed(2)}`}</p>
                                  </div>
                                
                                  <div className={style.textInRow}>
                                    <p>Total</p>
                                    <b>{`$ ${total.toFixed(2)}`}</b>
                                  </div>
                                
                                </div>

                                <div className={style.paymentMethod}>

                                <div className={style.subSubTitle}>
                                    <b>PAYMENT METHOD</b>
                                  </div>
                                  <div className={style.textSymple}>
                                    <p>{order.method}</p>
                                  </div>

                                </div>

                                <div className={style.shippingInformation}>

                                  <div className={style.subSubTitle}>
                                    <b>SHIPMENT INFORMATION</b>
                                  </div>

                                  <div className={style.textSymple}>
                                    <p>{`Recipient name: ${order.receiver}`}</p>
                                    <p>{order.direction}</p>
                                    <p>{`${order.city}, ${order.state}`}.</p>  
                                    <p>{order.country}</p>
                                  </div>
                                  
                                </div>

                                {/* <div className={style.invoice}>

                                  <div className={style.subSubTitle}>
                                    <b>RECEIPTS:</b>
                                  </div>

                                  <div className={style.textSymple}>
                                    <p>{`Invoice No.: ${"AGREGAR No. FACTURA"}`}</p>
                                    <button className={style.button}>Download</button> 
                                  </div>
                                  

                                </div> */}

                              </div>

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