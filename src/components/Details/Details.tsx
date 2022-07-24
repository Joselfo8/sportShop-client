import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addProductToCart, addProductToFavorites, getDetails } from '../../redux/action'
import { Link } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import styles from './Details.module.scss'
import { FaStar,FaHeart } from 'react-icons/fa'
import { FiShoppingCart,FiHeart } from "react-icons/fi";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { TbHeartPlus } from "react-icons/tb"
import Footer from '../Footer/Footer'
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";


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




let sizes:string[]=['xs','s','m','l','xl']
  


export default function Details(){
  
    const dispatch = useDispatch()

    
   
    // HOOKS: 
    const navigate = useNavigate()
    const params = useParams()

    

    // ESTADOS: 
    const productDetail: any = useSelector((state:any) => state.rootReducer.details)
    

    const isLoggedIn: any =useSelector((state:any) => state.auth.isLoggedIn)

    const auth: any =useSelector((state:any) => state.auth.auth)

    const [color, setColor] = useState<String>()

    let rate:number=productDetail?.rating

    const [successful, setSuccessful] = useState<String>()

    const [errors, setErrors] = useState<String>()

    const [size, setSize]:any = useState('')

    const [quantity, setQuantity]: any = useState('')

    const [open, setOpen] = useState(false)

   
    // RENDERIZADO DEL COMPONENTE: 
    useEffect(()=>{
        dispatch(getDetails(params.id))
    },[params.id])
    
    // HANDLES PARA AGREGAR AL CARRITO Y FAVORITOS:
    const addFavorite = (e:any)=>{
      e.preventDefault()

      if(!isLoggedIn){
        navigate('/login')
      } else {
        if(auth){ 
          const product:number=productDetail.id
          const user: number = auth.user.id  
          const payload = {
            user:user,  
            product:product
          }
            dispatch(addProductToFavorites(payload))
            setColor('#a70f0f')
            setSuccessful('¡Added to favorites!')
          } else {
            return(alert('Login first'),navigate('/login'))
          }
        }
    }

    const addToCart = (e:any) => {
      e.preventDefault()

      if(!isLoggedIn){
        navigate('/login')
      } else if(size === '') {
        return setErrors('Select your size first')
      } else {
        if(auth){
          const product:number=productDetail.id
          const user: number = auth.user.id  
          
          const payload = {
            user:user,  ///Para que funcione mientras tanto poner 66
            product:product,
            size: size,
            quantity: quantity
          }
          setOpen(!open)
          dispatch(addProductToCart(payload))
        }else{
          return(alert('Login first'),navigate('/login'))
        }
      }  
    }

    const onChangeSize = (e:any) => {
      setSize(e.target.value)
      setErrors('')
      setSuccessful('')
    }

    const onChangeQuantity = (e:any) => {
      setQuantity(e.target.value)
      setErrors('')
      setSuccessful('')
    }



  return (
    <div>
      <NavBar/> 

      <div className={styles.gridLayout}>
      
        <div className={styles.col1}>
          <div>
            <Link to='/' className={styles.link}>
              <span className={styles.pLink}>HOME</span>
            </Link>
            <span>/</span>

            <Link to={`/:${productDetail.category}`} className={styles.link}>
              <span className={styles.pLink}>{productDetail.category}</span>
            </Link>
            <span>/</span>
           

            <Link to={`/products?category=${productDetail.category}&subCategory=${productDetail.subCategory}`} className={styles.link}>
              <span className={styles.pLink}>{productDetail.subCategory}</span>
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
              <FaStar key={i} color={raitingValue <= rate ? '#000':'#e4e5e9'} />
            )})
          }
          <span >({productDetail['rating_count']})</span>
          <hr></hr>
          
          <h1>{productDetail.title}</h1>
          <p className={styles.price}>${productDetail.price}</p>
          <h2>SELECT SIZE</h2>


          {/* FORM ADD TO CART */}
          <form onSubmit={addToCart}>
            { productDetail.stock &&
              Object.keys(productDetail.stock).map((s,index) => 
              <div key= {index} className={styles.containerSize}>
                <ul  className= {styles.ksCboxtags}>
                  <li > 
                    <input 
                      onChange={(e) => onChangeSize(e)} 
                      value={s} 
                      type='radio'
                      id={s}
                      name='radio'/>
                      <label htmlFor={s}>{s.toUpperCase()}</label>
                  </li>
                </ul>    
              </div>) 
            }
            <div className={styles.contErrors}>
            {
              errors && <span className={styles.errors}>{errors}</span>
            }
            </div>
            <br></br>
            
            <input onChange={(e) => onChangeQuantity(e)}  ></input>
            <button type='submit' className={styles.cart}>
                <FiShoppingCart/>               
                ADD TO CART
            </button>
            
          
              <button  onClick={addFavorite}  className={styles.favorite}>
                <FiHeart  style = {{color: `${color}`}} className={styles.heart} />
              </button>
              <div className={styles.contSucess}>
              {
              successful && <span className={styles.sucessful}>{successful}</span>
              }
              </div>
          </form>
          <div className={styles.modal}>
            <Modal backdrop= {true} isOpen={open}>
              {/* <div className={styles.containerButtonX}> */}
                <button className={styles.buttonNav} style={{marginLeft:"auto", width:"50px", backgroundColor:"black",color:"white"}} onClick={()=>setOpen(!open)}>X</button>
              {/* </div> */}
              <ModalHeader className={styles.modalHeader}>
                <h1>Product added to cart</h1>
              </ModalHeader> 
              <ModalBody className={styles.modalBody}>
                <div>
                  <Link to='/'>
                    <button className={styles.buttonNav}>Continue Shopping</button>
                  </Link>
                </div>
                <br></br>
                <div>
                  <Link to='/cart'>
                    <button  className={styles.buttonNav}>Show car</button>
                  </Link>
                </div>
              </ModalBody>
            </Modal>
            </div>

          <h2 className={styles.description}>DESCRIPTION</h2>
          <p>{productDetail.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat dicta quae eos quaerat optio, asperiores similique tempora voluptatum reiciendis debitis expedita quam impedit id exercitationem ea accusamus nostrum nemo possimus.</p>
        </div >

      </div>
      <Footer />
    </div>
    
  )
}