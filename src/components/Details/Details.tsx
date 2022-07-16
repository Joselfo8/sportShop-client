import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addProductToCart, addProductToFavorites, getDetails } from '../../redux/action'
import { Link } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import styles from './Details.module.scss'
import { FaStar,FaHeart } from 'react-icons/fa'
import { FiShoppingCart } from "react-icons/fi";
import Footer from '../Footer/Footer'



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
    const isLoggedIn: any =useSelector((state:any) => state.auth.isLoggedIn)
    const auth: any =useSelector((state:any) => state.auth.auth)
    
    const product:number=productDetail.id
    const user: number = auth.user.id  


    const payload = {
      user:user,  ///Para que funcione mientras tanto poner 66
      product:product
    }

    const navigate = useNavigate()
    const params = useParams()

    

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
    },[params.id])
    
  
    const addFavorite = (e:any)=>{
      e.preventDefault()

      if(!isLoggedIn){
        navigate('/login')
      } else {
        dispatch(addProductToFavorites(payload))
        return(alert('Product added to favorite successfully'),navigate('/favorites')) 
      }
    }

    const addToCart = (e:any) => {
      e.preventDefault()

      if(!isLoggedIn){
        navigate('/login')
      } else if(size.s === '' && size.m === '' && size.l === '' && size.xl === '') {
        return setErrors('Select your size first')
      } else {
        if(auth){
          // console.log(user,product)
          dispatch(addProductToCart(payload))
          return(alert('Product added to cart successfully'),navigate('/cart'))
        }else{
          return(alert('Login first'),navigate('/login'))
        }
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
              <div key= {index} className={styles.containerSize}>
                <ul  className= {styles.ksCboxtags}>
                  <li > 
                    <input 
                      onChange={(e) => setSize({[e.target.name]: e.target.value})} 
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
            
            
            <button type='submit' className={styles.cart}>
                <FiShoppingCart/>               
                ADD TO CART
            </button>
            
           
            <Link to={'/favorites'}>
              <button onClick={addFavorite} className={styles.favorite}>
                <FaHeart  className={styles.heart} />
              </button>
            </Link>
          </form>

          <h2 className={styles.description}>DESCRIPTION</h2>
          <p>{productDetail.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat dicta quae eos quaerat optio, asperiores similique tempora voluptatum reiciendis debitis expedita quam impedit id exercitationem ea accusamus nostrum nemo possimus.</p>
        </div >

      </div>
      <Footer />
    </div>
    
  )
}