import { useDispatch } from 'react-redux'
import { orderByPrice } from '../../redux/action'
import { useState } from 'react'
import styles from './Filter.module.scss'

export default function Filter(){

    const dispatch = useDispatch()
    const [, setOrder] = useState<String>('')
    
    const handleOrderByPrice = (e:any) => {
        // e.preventDefault() 
        setOrder(e.target.value)
        dispatch(orderByPrice(e.target.value))    
        console.log(e.targe.value)
    }
      
  return (
    <div className={styles.container}>
      <p>Oder by:</p>
      <div  >
        <select
          className={styles.select}
          defaultValue='price'
          onChange={(e)=>handleOrderByPrice(e)}
          
        >
          <option value='price' selected disabled>Order By Price</option>
          <option value='minToMax'>Lower Price</option>
          <option value='maxToMin'>Higher Price</option>
        </select>
      </div>
     
    </div>
  )
}
