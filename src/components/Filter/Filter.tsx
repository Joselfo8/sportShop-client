import { useDispatch } from 'react-redux'
import { orderByPrice } from '../../redux/action'
import styles from './Filter.module.scss'

export default function Filter(){

    const dispatch = useDispatch()
   
    const handleOrderByPrice = (e:any) => {
        dispatch(orderByPrice(e.target.value))    
        // console.log(e.target.value)
    }
      
  return (
    <div className={styles.container}>
      <p>Order by:</p>
      <div  >
        <select
          className={styles.select}
          defaultValue='price'
          onChange={(e)=>handleOrderByPrice(e)}
          
        >
          <option value='price' selected disabled>Order By Price</option>
          <option value='cheap'>Cheap</option>
          <option value='expensive'>Expensive</option>
        </select>
      </div>
     
    </div>
  )
}
