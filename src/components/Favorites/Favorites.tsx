import  { useEffect, useState } from 'react'
import NavBar from '../Navbar/Navbar'
import styles from './Favorites.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, deleteFavorite, getFavorites } from '../../redux/action'
import Footer from '../Footer/Footer'
import { FiShoppingCart } from "react-icons/fi";
import { Modal, ModalBody, ModalHeader } from 'reactstrap'


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

    const [quantity, setQuantity]: any = useState(1)

    const [open, setOpen] = useState(false)


  
    
    
    const handleDelete = (e:any,payload:any) => {
        e.preventDefault()
        dispatch(deleteFavorite(payload))
    }

    const addToCart = (e:any,info:any) => {
      e.preventDefault()

      if(size === '') {
        return setErrors({size:'Select your size first'})
      } else if (false){
        return setErrors({quantity: 'There are not enough products'})
      } else {
          setOpen(!open)
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
    <div  >
        <NavBar/>
        <div className={styles.containerG}>
        <div className={styles.title}>
          <h1>MY WISH LIST</h1>
        </div>
        <div className={styles.container}>
        { favorites?.map((f:any,index:any) => {
            const payload = {
                product: f.id,
            }
            const info =  {
              product: f.id, 
              size: size,
              quantity: quantity
            } 
            return(  
                <div key={f.id} className={styles.favorites}>
                
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
                                    f.stock ? (Object.keys(f.stock).map((e:any, index:any) => (
                                      <option key={index} value={e}>{e}</option>
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
                    <Modal isOpen={open}>
              
            <button className={styles.buttonModal} style={{marginLeft:"auto", width:"50px",   backgroundColor:"black",color:"white"}} onClick={()=>setOpen(!open)}>X</button>
              
            <ModalHeader className={styles.modalHeader}>
              <header>Product added to cart</header>
            </ModalHeader> 

            <ModalBody className={styles.modalBody}>
              <div>
                  <Link to='/'>
                    <button className={styles.buttonModal}>Continue Shopping</button>
                  </Link>
              </div>
              <br></br>
              <div>
                <Link to='/cart'>
                  <button  className={styles.buttonModal}>Show car</button>
                </Link>
              </div>
            </ModalBody>
          </Modal>

                </div>
                )
            })
        }
        </div>
        </div>
        
      
       <Footer/>
    </div>
  )
}
