import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addStock } from 'redux/action'
import styles from './Sizes.module.scss'

let CLOTHES = ["XS","S","M","L","XL"]
let FOOTWEAR = [5, 5.5 , 6 , 6.5, 7 , 7.5 , 8 , 8.5 , 9 , 9.5]


const Woman = ({subCategory,id}:any) => {

    const dispatch = useDispatch()

    const [size, setSize]:any = useState({
        footwear:'',
        clothes: ''
    })

    const [quantity, setQuantity]:any = useState({
        clothes: '',
        footwear: ''
    })

    const handleChangeQuantity = (e:any) => {
        setQuantity({
            ...quantity,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeSizes = (e:any) => { 
       if(subCategory === 'CLOTHES'){
            setSize({
                clothes: e.target.value
            })
       } else {
            setSize({
                footwear:  e.target.value
            })
       }

   
    }

    const onSubmit = (e:any) => {
        e.preventDefault()
        if(subCategory === 'CLOTHES'){
            let payload= {
                quantity: quantity.clothes, 
                size: size.clothes,
                product: id
            }    
            dispatch(addStock(payload))
        } else {
            let payload= {
                quantity: quantity.footwear, 
                size: size.footwear,
                product: id
            }
            dispatch(addStock(payload))
        }
       
        
    }


    if(subCategory === 'CLOTHES'){
        return (
            <div className={styles.container}>
                <form onSubmit={onSubmit}>
                    <div className={styles.containerForm}>
                        <label>Select size</label>
                        <select defaultValue={'Select Size'} onChange={handleChangeSizes} name="clothes">
                            <option value={'Select Size'} disabled>Select Size</option>
                            {
                                CLOTHES.map((c:any,index:number) => (
                                    <option key={index} value={c}>{c}</option>
                                ))
                            }
                        </select>
                        <label>Enter quantity</label>
                        <input type='text' placeholder='Enter quantity...' onChange={handleChangeQuantity} name='clothes' ></input>
                        <button type='submit'>ADD STOCK</button>
                    </div>
                </form>
            </div>
            
        ) 
    } else if (subCategory === 'FOOTWEAR'){
        return (
            <div className={styles.container}>
                <form onSubmit={onSubmit}>
                    <div className={styles.containerForm}>
                        <label>Select size</label>
                        <select defaultValue={'Select Size'} onChange={handleChangeSizes} name="footwear" >
                            <option value={'Select Size'} disabled>Select Size</option>
                            {
                                FOOTWEAR.map((f:any,index:number) => (
                                    
                                    <option key={index} value={f}>{f}</option>
                                ))
                            }
                        </select>
                        <label>Enter quantity</label>
                        <input type='text' placeholder='Enter quantity...'  onChange={handleChangeQuantity} name='footwear'></input>
                        <button type='submit'>ADD STOCK</button>
                    </div>
                </form>
            </div>
        )
    } else {
        return( <div>THIS PRODUCT DOES NOT HAVE SIZES TO ADD</div>)
    }
}

export default Woman
