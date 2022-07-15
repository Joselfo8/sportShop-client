import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetails } from '../../redux/action'
import { Link } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import styles from './Details.module.scss'
import { FaStar,FaHeart } from 'react-icons/fa'
import { FiShoppingCart } from "react-icons/fi";



interface Detail {
  id:number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: any;
}

interface Input {
  s: string;
  m: string;
  l: string;
  xl: string;
}




let sizes:string[]=['s','m','l','xl']
  


export default function Details(){
  
    const dispatch = useDispatch()
    const productDetail: any = useSelector((state:any) => state.rootReducer.details)
    const params = useParams()

    console.log(productDetail)

    let rate:number=productDetail?.rating
    

    const [errors, setErrors] = useState<String>()

    const [size, setSize]:any = useState({
      s:'',
      m:'',
      l:'',
      xl:''
    })

    useEffect(()=>{
        dispatch(getDetails(params.id))
    },[dispatch, params.id])
    

    const addFavorite = (e:any)=>{
      e.preventDefault()
    }

    const addToCart = (e:any) => {
      e.preventDefault()

      if(size.s.length === 0 && size.m.length === 0 && size.l.length === 0 && size.xl.length === 0){
        return setErrors('Select your size first')
      } else {
        return setErrors('Sucessfully')
      } 
    
    }


  return (
    <div>
      <NavBar/> 
      


      <div className={styles.gridLayout}>
      
        <div className={styles.col1}>
          <div>
            <Link to='/' className={styles.link}>
              <p className={styles.pLink}>Home</p>
            </Link>
            <span>/</span>

            <Link to={`/:${productDetail.category}`}>
              <p>{productDetail.category}</p>
            </Link>
          </div>
          <img src={productDetail.image} alt='Not found'/>
          <h2 >CUIDADOS</h2>
          <p> {productDetail['product_care']} Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium doloribus accusantium vel. Minus eum aperiam, ducimus maiores consequatur quod distinctio fugit sit libero suscipit, harum unde eveniet cumque, corporis maxime? </p>
        </div>



        <div className={styles.col2}>
          {[...Array(5)].map((star,i) => {
            const raitingValue:number = i + 1
            return (
              <FaStar color={raitingValue <= rate ? '#000':'#e4e5e9'} />
            )})
          }
          <span >({productDetail['rating_count']})</span>
          
          <h1>{productDetail.title}</h1>
          <p className={styles.price}>${productDetail.price}</p>
          <h2>SELECT SIZE</h2>

          <form onSubmit={addToCart}>
            { 
              sizes.map((s,index) => 
              <div className={styles.containerSize}>
                <ul key={index} className= {styles.ksCboxtags}>
                  <li> 
                    <input 
                      onChange={(e)=> setSize(e.target.value)} 
                      value={s} 
                      type='radio'
                      id={s}
                      name='radio'/>
                      <label htmlFor={s}>{s.toUpperCase()}</label>
                  </li>
                </ul>    
              </div>) 
            }

            {
              errors && <span>{errors}</span>
            }
            <br></br>
            
            <Link to='/cart' className={styles.link}>
              <button type='submit' className={styles.cart}>
                  <FiShoppingCart/>               
                  ADD TO CART
                </button>
            </Link>
           
            <Link to={'/favorites'}>
              <button onSubmit={addFavorite} className={styles.favorite}>
                <FaHeart  className={styles.heart} />
              </button>
            </Link>
          </form>

          <h2 className={styles.description}>DESCRIPTION</h2>
          <p>{productDetail.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat dicta quae eos quaerat optio, asperiores similique tempora voluptatum reiciendis debitis expedita quam impedit id exercitationem ea accusamus nostrum nemo possimus.</p>
        </div >

      </div>
    </div>
    
  )
}