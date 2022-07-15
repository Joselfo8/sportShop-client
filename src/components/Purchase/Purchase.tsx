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

// const { DB_USER } = process.env;
const stripePromise = loadStripe("pk_test_51LKaEAATR7GdGLkc7mu5mssziGvjyttaMQtfXseG4I9kS4EBvdgPLm67UpkkRQ13I1UWUe7JjVUWMalVudbwbkl000KbydKI9L");

export default function Purchase() {
    const user = 10

    const dispatch = useDispatch();
    const state = useSelector((state: any) => state);
    
    useEffect(() => {
        dispatch(getUserInformation(user));
        dispatch(getShoppingListByUserId(user));
    }, [dispatch]);

    console.log(state)

    // const subTotal = shoppinglist.map((p: any) => p.price).reduce((a: any,b: any) => a+b);
    const subTotal = state.rootReducer.shoppinglist.map((p: any) => p.price).reduce((a: any,b: any) => a+b);
    const shipping = 9
    const taxes = (subTotal + shipping)*0.0625 
    const total = subTotal + shipping + taxes

    // const soldProducts = shoppinglist.map((p: any) => p.title)
    const soldProducts = state.rootReducer.shoppinglist.map((p: any, index: number) => `${index+1}- ${p.title} $${p.price}`)
    //error lens

    const render = (
        state.rootReducer.shoppinglist && state.rootReducer.shoppinglist.length === 0 
        // shoppinglist.length === 0
        ?   <div className={style.warningContainer}>
                <AiFillWarning className={style.warning}/>
                <h2 className={style.withoutProducts}>You have not selected products to buy!</h2>
            </div>
        :   (
                state.rootReducer.shoppinglist.map((product: any) => {
                // shoppinglist.map((product: any) => {
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
                        {/* {
                            shoppinglist.length === 0
                            ?   <p>$0</p>
                            :   <p>{`$${subTotal}`}</p>
                            
                        } */}
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
                    <h4>Payment method & purchase confirmation</h4>

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
                        <h3>Customer information</h3>
                        <h4>Shipping Address</h4>

                        <div className={style.textContainer}>
                        {
                        state.rootReducer.userInformation && !state.rootReducer.userInformation.name 
                            ?   <></>
                            :   <div>
                                    <p>{`Direction: ${state.userInformation.direction}`}</p>
                                    <p>{`City: ${"Los Ángeles"} - Country: ${"United States of America"}`}</p>
                                    <p>{`Telephone numbers: - ${+14243250588}`}</p>
                                </div>
                        }
                        </div>

                        
                        <h3>Shipping</h3>

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
