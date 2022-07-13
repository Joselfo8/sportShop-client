import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Components
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CheckoutForm from '../Checkout/Categories/CheckoutForm';

// Style
import style from "./Purchase.module.scss";

// const { DB_USER } = process.env;
const stripePromise = loadStripe("pk_test_51LKaEAATR7GdGLkc7mu5mssziGvjyttaMQtfXseG4I9kS4EBvdgPLm67UpkkRQ13I1UWUe7JjVUWMalVudbwbkl000KbydKI9L");

export default function Purchase() {

    // console.log("ENV", DB_USER)
    const render = (
        <div className={style.product}>
            
            <div className={style.image}>
                <img src="https://th.bing.com/th/id/R.4f2b0468bf3ad3a7ab079eb1b219b27e?rik=rW45jIXlLLnMNQ&pid=ImgRaw&r=0" alt="Camisa" />
            </div>

            <div className={style.detail}>
                <p>{`Red shirt`}</p>
                <p>{`Adidas`}</p>
                <p>{`Size M`}</p>
                <p>{`Units 1`}</p>
            </div>
            
            <div className={style.price}>
                <p>Unit value:</p>
                <p>{`$19`}</p>
            </div>

        </div>
    )

    return (
        <div>
            
            <NavBar/>
            

            <div className={style.purchaseContainer}>

                <div className={style.productsToBuy}>
                    <h3>Abstract</h3>
                    <h4>Products</h4>
                    {render}
                </div>

                <div className={style.paymentMethod}>
                    <h4>Total amount owed</h4>

                    <div className={style.textContainer}>
                        <p>{`Subtotal: `}</p>
                        <p>{`S `}</p>
                    </div>

                    <div className={style.textContainer}>
                        <p>{`Shipping: `}</p> 
                        <p>{`$ `}</p>
                    </div>
                    <br />

                    <div className={style.textContainer}>
                        <h2>{`Total: `}</h2> 
                        <h2>{`$ `}</h2>
                    </div>
                </div>

                <div className={style.shoppingBox}>
                    <h4>Payment method & purchase confirmation</h4>

                    <Elements stripe={stripePromise} >
                        <div className='formContainer'>
                            <CheckoutForm/>
                        </div>
                    </Elements>
                </div>

                <div className={style.customerInformation}>
                    <h3>Customer information</h3>
                    <h4>Shipping Address</h4>

                    <div className={style.textContainer}>
                        <p>{`Direction: `}</p>
                        <p>{`City: - State: `}</p>
                        <p>{`Telephone numbers: - `}</p>
                    </div>

                    
                    <h3>Shipping</h3>

                    <div className={style.textContainer}>
                        <p>The estimated delivery time is 1 to 5 business days.</p>
                        <p>Shipping Cost: $9</p>
                    </div>

                </div>

            </div>
            

            <Footer/>

        </div>
    );    
}
