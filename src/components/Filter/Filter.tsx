import { useDispatch } from 'react-redux'
import { allProducts } from 'redux/action/products';
import styles from './Filter.module.scss'

export default function Filter(where : any, page : any){
    const dispatch = useDispatch()
    let location = where.where;
    let title =  location[1] === "search" ? location[2] : '';
    const handleOrderByPrice = (order:any) => {
      dispatch(allProducts(location[1], location[2], page.page, order, title));
    };
  return (
    <div className={styles.container}>
      <p>Order by:</p>
      <div  >
        <select
          className={styles.select}
          onChange={(e)=>handleOrderByPrice(e.target.value)}
        >
          <option value='' selected disabled>Order By Price</option>
          <option value='cheap'>Cheap</option>
          <option value='expensive'>Expensive</option>
        </select>
      </div>
    </div>
  )
}
