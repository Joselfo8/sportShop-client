
// Components
import NavBar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

// Style
import style from "./Orders.module.scss";

export default function Orders() {

  return (
    <div>
      <NavBar />

      <div className={style.grid}>



        <div className={style.ordersContainer}>

          <div className={style.orderBar}>

            <div className={style.firstLine}>
              <b>Order No. 217778232</b>
              <p>Quantity: <b>4 products</b></p>
              <p>Order Total:<b>$ 157.135</b></p>
            </div>

            <div className={style.secondLine}>
              <p>Made on: 04/10/21</p>
              <button>hide order</button>
            </div>
                      
          </div>

          <div className={style.orderStatusContainer}>

            <h2 className={style.textCenter}>Order delivered</h2>
            <h2 className={style.textCenter}>delivery status graph</h2>
            <p className={style.textCenter}>06/Mar/2022 22:22:29</p>
            

            <div className={style.orderStatusHistory}>
              <div className={style.subtitle}>
                <h3>ORDER STATUS HISTORY</h3>
              </div>
              
              
              <div className={style.textInRow}>
                <p>06/Oct/2021 00:54:46</p>
                <b>We have received your order</b>
              </div>

              <div className={style.textInRow}>
                <p>06/Oct/2021 00:54:46</p>
                <b>The payment of the order has been received correctly</b>
              </div>
              
              <div className={style.textInRow}>
                <p>06/Oct/2021 00:54:46</p>
                <b>We are preparing your order</b>
              </div>
              
              <div className={style.textInRow}>
                <p>06/Oct/2021 00:54:46</p>
                <b>The order is ready</b>
              </div>

              <div className={style.textInRow}>
                <p>07/Oct/2021 01:01:11</p>
                <b>Your order is on its way</b>
              </div>

              <div className={style.textInRow}>
                <p>07/Oct/2021 09:21:36</p>
                <b>Your order is about to arrive at the destination</b>
              </div>

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

              <div className={style.productsContainer}>

                <div className={style.productDetail}>

                  <div className={style.flagContainer}>
                    <img className={style.flag} src="https://ae01.alicdn.com/kf/HTB19SdxKpXXXXctXXXXq6xXFXXXc/404-folla-Not-Found-T-Shirt-blanco-y-negro-la-ropa-de-moda-t-mujeres-y.jpg_Q90.jpg_.webp" alt="" />
                  </div>

                  <div className={style.detail}>
                    <b>Brand</b>
                    <p>Shirt White Ml Cfit Unicolor Bd</p>
                    <p>Size: M</p>
                  </div>

                </div>

                <div className={style.productPrice}>

                  <div className={style.cost}>
                    <p>$ 59.9</p>
                  </div>

                  <div className={style.amount}>
                    <p>1</p>
                  </div>

                  <div className={style.Subtotal}>
                    <p>$ 59.900</p>
                  </div>

                </div>

              </div>

              <div className={style.resume}>
                
                <div className={style.valueContainer}>
                
                  <div className={style.textInRow}>
                    <p>Subtotal (4 products):</p>
                    <p>$ 157.1</p>
                  </div>
                
                  <div className={style.textInRow}>
                    <p>costo envio</p>
                    <p>$ 9</p>
                  </div>

                  <div className={style.textInRow}>
                    <p>impuesto</p>
                    <p>$ 4.1</p>
                  </div>
                
                  <div className={style.textInRow}>
                    <p>total</p>
                    <b>$ 161.2</b>
                  </div>
                
                </div>

                <div className={style.paymentMethod}>

                <div className={style.subSubTitle}>
                    <b>PAYMENT METHOD</b>
                  </div>
                  <div className={style.textSymple}>
                    <p>Credit / debit card</p>
                  </div>

                </div>

                <div className={style.shippingInformation}>

                  <div className={style.subSubTitle}>
                    <b>SHIPMENT INFORMATION</b>
                  </div>

                  <div className={style.textSymple}>
                    <p>Recipient name:</p>
                    <p>150 East 58th St., 30th Floor</p>
                    <p>Manhattan, New York.</p>  
                    <p>United States</p>
                  </div>
                  
                </div>

                <div className={style.invoice}>

                  <div className={style.subSubTitle}>
                    <b>RECEIPTS:</b>
                  </div>

                  <div className={style.textSymple}>
                    <p>Invoice No.: 0001-03715444</p>
                    <button>Download</button> 
                  </div>
                  

                </div>

              </div>

            </div>


          </div>

          

        </div>
      
      
      
      </div>

      <br />

      <Footer />
    </div>
  );
}
