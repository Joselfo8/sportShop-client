import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetails } from '../../redux/action'
import { Link } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import styles from './Details.module.scss'
import cart from '../../assets/cart.png';
import { FaStar } from 'react-icons/fa'
import { FiHeart } from "react-icons/fi";



// type Num = {
//   rate:number;
//   count:number;
// }

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


function validateForm(size:Input){

  let errors:any = {}

  if(!size.s && !size.m && !size.l && size.xl){
    errors.s= 'Select size first'
  } else {
    errors.s = ''
  }

  return errors
}

let sizes:string[]=['s','m','l','xl']
  


export default function Details(){
  
    const dispatch = useDispatch()
    const productDetail: any = useSelector((state:any) => state.details)
    const params = useParams()
   

    let rate:number=productDetail?.rating
    

    const [errors, setErrors] = useState({
      size:''
    })

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

      setErrors(validateForm({
        ...size,
        [e.target.id] : [e.target.value]
      }))

      
    }

    const handleSize = (e:any) => {
    
      setSize({
        [e.target.id] : [e.target.value]
      })
      
     

      console.log(size)
      // console.log(input.m)
      // console.log(input.l)
      // console.log(input.xl)
    }

  return (
    <div>
      <NavBar/> 
      


      <div className={styles.gridLayout}>
      

        <div className={styles.col1}>
          {/* <p>Inicio / Categoria / Sub Cateogria</p> */}
          <img src={productDetail.image} alt='Not found'/>
          {/* <h2>Detalle del producto</h2>
          <p> Texto de detallle </p> */}
          <h2 >Cuidados</h2>
          <p> {productDetail['product_care']} </p>
        </div>



        <div className={styles.col2}>

          {[...Array(5)].map((star,i) => {
            const raitingValue:number = i + 1
            return (
              <FaStar color={raitingValue <= rate ? '#000':'#e4e5e9'}  size={15}/>
            )})
          }
          <span>({productDetail['rating_count']})</span>
          
          <h1>{productDetail.title}</h1>
          <p className={styles.price}>${productDetail.price}</p>
          <p className={styles.selectSize}>Select Size</p>


          <form onSubmit={addToCart}>
            { 
              sizes.map((s,index) => 
              <div className={styles.container}>
                <ul key={index} className= {styles.ksCboxtags}>
                  <li>
                    
                    <input 
                      onChange={(e)=> handleSize(e)} 
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
              errors.size && <span>{errors.size}</span>
            }
            <br></br>
           
              <button type='submit' className={styles.cart}>
                <img src={cart} alt='' className={styles.icon}/>
                ADD TO CART
              </button>
            
              
              <Link to={'/login'}>
                <button onSubmit={addFavorite} className={styles.favorite}>
                  <FiHeart className={styles.heart} size={25}/>
                </button>
              </Link>
           
            
          </form>

          <h2 className={styles.description}>Description</h2>
          <p className={styles.description}>{productDetail.description}</p>
          {/* <h2>Costo de envio</h2>
          <p>Informacion</p>
          <h2>Entrega</h2>
          <p>Informacion</p>
          <h2>Valoraciones</h2>
          <p>Informacion</p> */}

        
        </div >
      </div>
    </div>
    
  )
}