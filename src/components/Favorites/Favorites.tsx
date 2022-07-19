import  { useEffect } from 'react'
import NavBar from '../Navbar/Navbar'
import styles from './Favorites.module.scss'
import camiseta from './camiseta.jpg'
import { Link, useNavigate } from 'react-router-dom'
import cart from '../../assets/cart.png';
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, deleteFavorite, getFavorites } from '../../redux/action'
import Footer from '../Footer/Footer'


export default function Favorites(){
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    
    const favorites = useSelector((state:any) => state.rootReducer.favorites)
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
            const user: number = userID
            const payload = {
              user:user,  ///Para que funcione mientras tanto poner 66
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
        dispatch(getFavorites(userID))
    },[favorites])
    
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

                        <div className={styles.col1}>
                            <img src={f.image} alt='cargando' className={styles.imgProduct}/>
                            <p>Price: ${f.price}</p>
                            <p>Name: {f.title}</p>
                            {/* <p className={styles.cantidad}>Cantidad</p>
                            <input type='text'></input> */}
                            <Link to='/cart' className={styles.link}>
                                <button value={f.id} onClick={(e) => addToCart(e)} >
                                    <img src={cart} alt='' className={styles.icon} />
                                    ADD TO CART
                                </button>     
                            </Link>                                           
                        </div>
                            

                        <div className={styles.col2}>    
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
