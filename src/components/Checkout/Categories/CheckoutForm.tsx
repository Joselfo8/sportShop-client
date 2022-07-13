import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

// Style
import style from './CheckoutForm.module.scss';

export default function CheckoutForm() {

  const stripe: any = useStripe();
  const elements: any = useElements();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    setLoading(true)

    if(!error) {
      // console.log(paymentMethod)
      const {id} = paymentMethod;

      try {
        //generar una action y un reducer para esta accion
        const {data} = await axios.post('http://localhost:3001/api/checkout', {
          id,
          //100 dolares
          amount: 10000, 
        });
      
        console.log(data)
        
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
        
        <p>Please enter your card information (credit / debit)</p>

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
