import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Swal from 'sweetalert2';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { postPurchase, deleteShoppingList } from "../../redux/action/index";


// Style
import style from './CheckoutForm.module.scss';

export default function CheckoutForm({total, name, email, soldProducts, direction, city, state, country, userId}: any) {
  const navigate = useNavigate()

  const stripe: any = useStripe();
  const elements: any = useElements();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  let jsonSoldProducts = JSON.stringify(soldProducts)
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    setLoading(true)

    if(!error) {
      const {id} = paymentMethod;

      try {
        //generar una action y un reducer para esta accion
        const {data} = await axios.post('https://vlixes-server.herokuapp.com/stripes/pay/', {
          id,
          jsonSoldProducts,
          amount: total*100, 
        });
      
        if(data === "Succesfull payment") {
          dispatch(postPurchase({
            method: "Credit / debit card", 
            receiver: name, 
            direction, 
            city, 
            state, 
            country,
            })
          )

          dispatch(deleteShoppingList(userId))
          
          
          Swal.fire({
            title: `Order placed, thank you!`,
            text: `Confirmation will be sent you email.`,
            html: `<b>Transaction id: ${id}</b> <br/> <p>Confirmation will be sent you email.</p>`,
            icon: "success",
            width: '40%',
            confirmButtonText: "Accept",
            footer: 'Remember that your order will be delivered within one to five days',
          })

          navigate('/')

        } else {
          Swal.fire({
            title: `Rejected transaction`,
            text: `Please review the information provided or contact your bank.`,
            icon: "error",
            width: '40%',
            confirmButtonText: "Accept",
          })
        }
        
        elements.getElement(CardElement).clear()  

      } catch(error) {
        console.log(error)
      }

      setLoading(false)

    }

    
  }
  
  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style.form}>
        
        <h5>Please enter your card information (credit / debit)</h5>

        <p>{`Customer: ${name}`}</p>
        <p>{`E-mail: ${email}`}</p>

        <div>
          <CardElement className={style.CardElement}/>
        </div>
        
        <br />
          
        <div className={style.buttonContainer}>
          <button disabled={!stripe} className={style.button}>
            {loading ? ( "Loading...") : "Make a purchase"}
          </button>
        </div>


      </form>  
    </div>
  )

}
