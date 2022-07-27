import  { useEffect, useState } from 'react'
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
    console.log(favorites)
    const [errors, setErrors]:any = useState({
      size: '',
      quantity:''
    })

    const [size, setSize]:any = useState('')

    const userID = useSelector((state:any) => state.auth.auth?.user.id)
    const isLoggedIn: any =useSelector((state:any) => state.auth.isLoggedIn)
    const auth: any =useSelector((state:any) => state.auth.auth)
    const [quantity, setQuantity]: any = useState('')
    
    
    const handleDelete = (e:any,payload:any) => {
        e.preventDefault()
        dispatch(deleteFavorite(payload))
    }

    const addToCart = (e:any,info:any) => {
      e.preventDefault()

      if(size === '') {
        return setErrors({size:'Select your size first'})
      } else if(quantity === ''){
        return setErrors({quantity: 'Enter quantity'})
      } else {
          dispatch(addProductToCart(info))
          setSize('')
          setErrors('')
      }  
    }

    const onChangeQuantity = (e:any) => {
      setQuantity(e.target.value)
    }

    const onChangeSize = (e:any) => {
      setSize(e.target.value)
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
            }
            const info =  {
              product: f.id, 
              size: size,
              quantity: quantity
            } 
            return(  
                <div className={styles.favorites}>
                
                    <div className={styles.gridLayout}>

                        <div className={styles.row1}>
                            <img src={f.image} alt='cargando' className={styles.imgProduct}/>
                            <hr></hr>
                            <p>Price: <span>${f.price}</span></p>
                            <p>Name:  <span>{f.title}</span> </p>

                            <form onSubmit={(e)=>addToCart(e,info)}>
                              <div className={styles.selectSize}>
                                <select
                                  onChange={onChangeSize}
                                  defaultValue='Select size'
                                >
                                  <option value='Select size' disabled>Select size</option>
                                  {
                                    f.stock ? (Object.keys(f.stock).map((e:any) => (
                                      <option value={e}>{e}</option>
                                    ))) : (<option></option>)
                                  }
                                </select>
                              </div>
                              {
                                errors.size && <span className={styles.errors}>{errors.size}</span>
                              } 
                              
                              <div className={styles.containerButtons}>
                                <input defaultValue={'1'} onChange={(e) => onChangeQuantity(e)}></input>
                                    <button type='submit' className={styles.buttonCart}>
                                        <FiShoppingCart/>  
                                        ADD TO CART
                                    </button>          
                              </div>
                            </form>
                            {
                              errors.quantity && <span className={styles.errors}>{errors.quantity}</span>
                            }                                     
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
