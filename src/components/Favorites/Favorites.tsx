import  { useEffect } from 'react'
import NavBar from '../Navbar/Navbar'
import styles from './Favorites.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, deleteFavorite, getFavorites } from '../../redux/action'
import Footer from '../Footer/Footer'
import { FiShoppingCart } from "react-icons/fi";


export default function Favorites(){
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    
    const favorites = useSelector((state:any) => state.rootReducer.favorites)
    const cartInfo = useSelector((state:any) => state.rootReducer.cart)
    console.log(cartInfo)
    const userID = useSelector((state:any) => state.auth.auth?.user.id)
    const isLoggedIn: any =useSelector((state:any) => state.auth.isLoggedIn)
    const auth: any =useSelector((state:any) => state.auth.auth)
    
    
    const handleDelete = (e:any,payload:any) => {
        e.preventDefault()
        dispatch(deleteFavorite(payload))
    }

    const addToCart = (e:any) => {
        e.preventDefault()
        console.log(e.target.value)
        if(!isLoggedIn){
          navigate('/login')
        } else {
          if(auth){
            const product:number=e.target.value
            const payload = { 
              product:product
            }
            dispatch(addProductToCart(payload))
            return(alert('Product added to cart successfully'),navigate('/cart'))
          }else{
            return(alert('Login first'),navigate('/login'))
          }
        }  
      }

    useEffect(() => {
        dispatch(getFavorites())
    },[])
    
  return (
    <div >
        <NavBar/>
        <h1>MY WISH LIST</h1>
        <div className={styles.container}>
        { favorites?.map((f:any) => {
            const payload = {
                product: f.id,
                user: userID
            } 
            return(  
                <div className={styles.favorites}>
                
                    <div className={styles.gridLayout}>

                        <div className={styles.row1}>
                            <img src={f.image} alt='cargando' className={styles.imgProduct}/>
                            <hr></hr>
                            <p>Price: <span>${f.price}</span></p>
                            <p>Name:  <span>{f.title}</span> </p>
                            {/* <p className={styles.cantidad}>Cantidad</p>
                            <input type='text'></input> */}
                            <Link to='/cart' className={styles.link}>
                                <button value={f.id} onClick={(e) => addToCart(e)} >
                                    <FiShoppingCart/>  
                                    ADD TO CART
                                </button>     
                            </Link>                                           
                        </div>
                            

                        <div className={styles.row2}>    
                            <button  onClick={(e)=>handleDelete(e,payload)}>Delete »</button>
                                <Link to = {`/products/${f.id}`}>
                                    <button>Details »</button>
                                </Link>                                
                            </div>   
                    </div>

                </div>
                )
            })
        }
        </div>
        
      
       <Footer/>
    </div>
  )
}
