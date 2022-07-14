import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Swal from 'sweetalert2';
import axios from 'axios'

// Style
import style from './CheckoutForm.module.scss';

export default function CheckoutForm({total, soldProducts}: any) {

  const stripe: any = useStripe();
  const elements: any = useElements();
  const [loading, setLoading] = useState(false)

  let jsonSoldProducts = JSON.stringify(soldProducts)
  

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
          jsonSoldProducts,
          amount: total*100, 
        });
      
        console.log("PRUEBA data",data)

        if(data === "Succesfull payment") {
          Swal.fire({
            // title: `Purchase made correctly`,
            title: `Order placed, thank you!`,
            text: `Confirmation will be sent you email.`,
            html: `<b>Transaction id: ${id}</b> <br/> <p>Confirmation will be sent you email.</p>`,
            // html: 'Confirmation will be sent you email.',
            icon: "success",
            width: '40%',
            confirmButtonText: "Accept",
            footer: 'Remember that your order will be delivered within one to five days',
            // customClass: {
            //   confirmButtonText: 'example-class' //insert class here
            // }
          })
                    
        } else {
          Swal.fire({
            title: `Rejected transaction`,
            text: `Please review the information provided or contact your bank.`,
            icon: "error",
            width: '40%',
            confirmButtonText: "Accept",
            // footer: 'Remember that your order will be delivered within one to five days',
            // customClass: {
            //   confirmButtonText: 'example-class' //insert class here
            // }
          })
        }
        
        elements.getElement(CardElement).clear()  

      } catch(error) {
        console.log(error)
      }

      setLoading(false)

    }

    
  }
  

  function fnalert() {
    let id = 123456
    // Swal.fire({
    //   // title: `Purchase made correctly`,
    //   title: `Order placed, thank you!`,
    //   text: `Confirmation will be sent you email.`,
    //   html: `<b>Transaction id: ${id}</b> <br/> <p>Confirmation will be sent you email.</p>`,
    //   // html: 'Confirmation will be sent you email.',
    //   icon: "success",
    //   width: '40%',
    //   confirmButtonText: "Accept",
    //   footer: 'Remember that your order will be delivered within one to five days',
    //   // customClass: {
    //   //   confirmButtonText: 'example-class' //insert class here
    //   // }
    // })

    Swal.fire({
      title: `Rejected transaction`,
      text: `Please review the information provided or contact your bank.`,
      icon: "error",
      width: '40%',
      confirmButtonText: "Accept",
      // footer: 'Remember that your order will be delivered within one to five days',
      // customClass: {
      //   confirmButtonText: 'example-class' //insert class here
      // }
    })
  };

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

        {/* <button onClick={() => fnalert()}>Prueba</button> */}

      </form>  
    </div>
  )

}
