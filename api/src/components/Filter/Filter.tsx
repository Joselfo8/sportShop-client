import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { allProducts } from 'redux/action/products';
import styles from './Filter.module.scss'

export default function Filter(){
    const navigate = useNavigate()
    const handleOrderByPrice = (order:any) => {
      navigate(`?order=${order}`)
    };
  return (
    <div className={styles.container}>
      {/* <p>Order by:</p> */}
      <div  >
        <select
          className={styles.select}
          onChange={(e)=>handleOrderByPrice(e.target.value)}
          defaultValue={'Order by price'}
        >
          <option value={'Order by price'} disabled>Order By Price</option>
          <option value='cheap'>Cheap</option>
          <option value='expensive'>Expensive</option>
        </select>
      </div>
    </div>
  )
}
