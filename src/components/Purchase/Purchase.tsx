import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { getUserInformation, getShoppingListByUserId } from "../../redux/action/index";
import { AiFillWarning } from "react-icons/ai";



// Components
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CheckoutForm from '../Checkout/CheckoutForm';

// Style
import style from "./Purchase.module.scss";

const stripePromise = loadStripe("pk_test_51LKaEAATR7GdGLkc7mu5mssziGvjyttaMQtfXseG4I9kS4EBvdgPLm67UpkkRQ13I1UWUe7JjVUWMalVudbwbkl000KbydKI9L");

export default function Purchase() {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.rootReducer);
    const user = useSelector((state: any) => state.auth.auth.user);
    
    const {id} = user
    console.log(user)
 
    useEffect(() => {
        dispatch(getUserInformation(id));
        dispatch(getShoppingListByUserId(id));
    }, [dispatch]);

    const subTotal = state.shoppinglist.length > 0 ? state.shoppinglist.map((p: any) => p.price).reduce((a: any,b: any) => a+b) : null
    const shipping = 9
    const taxes = (subTotal + shipping)*0.0625 
    const total = subTotal + shipping + taxes

    const soldProducts = state.shoppinglist.map((p: any, index: number) => `${index+1}- ${p.title} $${p.price}`)

    const render = (
        state.shoppinglist && state.shoppinglist.length > 0 
        ?   (
            state.shoppinglist.map((product: any) => {
                return (
                    <div className={style.product} key={product.id}>
                    
                        <div className={style.image}>
                            <img src={product.image || "https://th.bing.com/th/id/R.4f2b0468bf3ad3a7ab079eb1b219b27e?rik=rW45jIXlLLnMNQ&pid=ImgRaw&r=0"} alt="Camisa" />
                        </div>

                        <div className={style.detail}>
                            <p>{product.title || `Red shirt`}</p>
                            {/* no esta llegando marca */}
                            <p>{`Adidas`}</p>
                            {/* no esta llegando talla */}
                            <p>{`Size M`}</p>
                            <p>{`Units 1`}</p>
                        </div>
                        
                        <div className={style.price}>
                            <p>Unit value:</p>
                            <p>{`$${product.price}` || `$19`}</p>
                        </div>

                    </div>
                )
            })
    )
        :   <div className={style.warningContainer}>
                <AiFillWarning className={style.warning}/>
                <h2 className={style.withoutProducts}>You have not selected products to buy!</h2>
            </div>
    )
    

    return (
        <div>
            
            <NavBar/>
            

            <div className={style.purchaseContainer}>

                <div className={style.productsToBuy}>
                    <h3 className={style.title}>Abstract</h3>
                    <h4 className={style.subtitle}>Products</h4>
                    {render}
                </div>

                <div className={style.paymentMethod}>
                    <h4 className={style.subtitle}>Total amount owed</h4>

                    <div className={style.textContainer}>
                        <p>{`Subtotal: `}</p>
                        {
                            state.shoppinglist.length === 0
                            ?   <p>$0</p>
                            :   <p>{`$${subTotal}`}</p>
                            
                        }
                    </div>

                    <div className={style.textContainer}>
                        <p>{`Shipping: `}</p> 
                        <p>{`$${shipping}`}</p>
                    </div>
                    
                    <div className={style.textContainer}>
                        <p>{`Taxes: `}</p> 
                        <p>{`$${taxes.toFixed(2)}`}</p>
                    </div>

                    <div className={style.textContainer}>
                        <h2>{`Total: `}</h2> 
                        <h2>{`$${total.toFixed(2)}`}</h2>
                    </div>
                </div>

                <div className={style.shoppingBox}>
                    <h4 className={style.subtitle}>Payment method & purchase confirmation</h4>

                    <Elements stripe={stripePromise} >
                        <div className='formContainer'>
                            <CheckoutForm 
                                total={total.toFixed(2)}
                                name={state.userInformation.name}
                                email={state.userInformation.email}
                                soldProducts={soldProducts}
                            />
                        </div>
                    </Elements>
                </div>

                <div className={style.customerInformation}>

                    <div className={style.customerContainer}>
                        <h3 className={style.title}>Customer information</h3>
                        <h4 className={style.subtitle}>Shipping Address</h4>

                        <div className={style.textContainer}>
                        {
                        state.userInformation && !state.userInformation.name 
                            ?   <></>
                            :   <div>
                                    <p>{`Direction: ${state.userInformation.direction}`}</p>
                                    <p>{`City: ${state.userInformation.city}, ${state.userInformation.state}`}</p>
                                    <p>{`Country: ${state.userInformation.country}`}</p>
                                    <p>{`Phone number: +${state.userInformation.numberPhone}`}</p>
                                </div>
                        }
                        </div>

                        <h3 className={style.title}>Shipping</h3>

                        <div className={style.textContainer}>
                            <p>The estimated delivery time is 1 to 5 business days.</p>
                            <p>Shipping Cost: $9</p>
                        </div>
                    </div>

                </div>

            </div>
            

            <Footer/>

        </div>
        
    );    
}