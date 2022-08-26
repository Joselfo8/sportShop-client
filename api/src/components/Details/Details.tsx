import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addProductToCart, addProductToFavorites,getDetails } from '../../redux/action'
import { Link } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import styles from './Details.module.scss'
import { FaStar } from 'react-icons/fa'
import { FiShoppingCart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import Footer from '../Footer/Footer'
import { Modal, ModalHeader, ModalBody } from "reactstrap";


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
    console.log(productDetail)
    const isLoggedIn: any =useSelector((state:any) => state.auth.isLoggedIn)

    const auth: any =useSelector((state:any) => state.auth)

    const [color, setColor] = useState<String>()

    let rate:number=productDetail?.rating

    const [successful, setSuccessful] = useState<String>()

    const [errors, setErrors]:any = useState({
      size: '',
      quantity:''
    })

    const [size, setSize]:any = useState('')

    const [quantity, setQuantity]: any = useState(1)

    const [open, setOpen] = useState(false)

    
    const StoreKeys: any =  productDetail && productDetail.stock? Object.keys(productDetail.stock)  : [0]
  
    const filterSize = StoreKeys.filter((f:any) => f === size)
    
    
 
    // RENDERIZADO DEL COMPONENTE: 
    useEffect(()=>{
        dispatch(getDetails(params.id))
    },[dispatch,params.id])
    
    // HANDLES PARA AGREGAR AL CARRITO Y FAVORITOS:
    const addFavorite = (e:any)=>{
      e.preventDefault()

      if(!isLoggedIn){
        navigate('/login')
      } else {
        if(auth){ 
          const product:number=productDetail.id
          const payload = {
            product:product
          }
            dispatch(addProductToFavorites(payload))
            setColor('#a70f0f')
            setSuccessful('¡Added to favorites!')
            setTimeout(() => setSuccessful(''),1000)
          } else {
            return(alert('Login first'),navigate('/login'))
          }
        }
    }

    const addToCart = (e:any) => {
      e.preventDefault()

      if(!isLoggedIn){
        return(alert('Login first'),navigate('/login'))
      } else if(size === '') {
        return setErrors({size:'Select your size first'})
      }else if (quantity > productDetail.stock[filterSize]){
        return setErrors({quantity: 'There are not enough products'})
      } else {
        if(auth){
          const product:number = productDetail.id
          const payload = { 
            product:product,
            size: size,
            quantity: quantity
          }
          setOpen(!open)
          
          dispatch(addProductToCart(payload))
          setSize('')
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

          <div className={styles.containerNavegacion}>
            <Link to='/' className={styles.link}>
              <span className={styles.Navegacion}> HOME </span>
            </Link>
            <span>/</span>

            <Link to={`/${productDetail.category}`} className={styles.link}>
              <span className={styles.Navegacion}> {productDetail.category} </span>
            </Link>
            <span>/</span>
           

            <Link to={`/${productDetail.category}/${productDetail.subCategory}`} className={styles.link}>
              <span className={styles.Navegacion}> {productDetail.subCategory} </span>
            </Link>
          </div>

          <div className={styles.containerImage}>
            <img src={productDetail.image} alt='Not found'/>
          </div>
          
          <div className={styles.containerCuidados}>
            <h2 >CUIDADOS</h2>
            <p> {productDetail['product_care']?.length < 50 ? ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium doloribus accusantium vel. Minus eum aperiam, ducimus maiores consequatur quod distinctio fugit sit libero suscipit, harum unde eveniet cumque, corporis maxime?') :  productDetail['product_care']} </p>
          </div>
          
        </div>



        <div className={styles.col2}>

          <div className={styles.containerBuys}>
            {/* {[...Array(5)].map((star,i) => {
              const raitingValue:number = i + 1
              return (
                <FaStar key={i} color={raitingValue <= rate ? '#000':'#e4e5e9'} />
              )})
            }
            <span >({productDetail['rating_count']})</span> */}
             <span>Bought ({productDetail.buys}) times</span>
          </div>
         
          <hr></hr>

          <div className={styles.containerTittle}>
            <h1>{productDetail.title}</h1>
            <span>{productDetail.category} • {productDetail.subCategory}</span>
          </div>

          <h3 className={styles.price}>${productDetail.price}</h3>
       
          <h2>SELECT SIZE</h2>
          
          <form onSubmit={addToCart}>
            
            { productDetail.stock && !(Object.entries(productDetail.stock).length === 0 )?
              Object.keys(productDetail.stock).map((s:any,index) => 
              <div key= {index} className={styles.containerSize}>
                <ul  className= {styles.ksCboxtags}>
                  <li> 
                    <input 
                      onChange={(e) => onChangeSize(e)} 
                      value={s} 
                      type='radio'
                      id={s}
                      name='radio'/>
                      <label htmlFor={s}>{isNaN(s) ? (s.toUpperCase()): `US ${s}`}</label>
                  </li>
                </ul>    
              </div>) : <div className={styles.soldOut}>¡ Sold out !</div> 
            }
            
            <div className={styles.contErrors}>
            {
              errors.size && <span className={styles.errors}>{errors.size}</span>
            }
            </div>
            <br></br>

            <div className={styles.containerButtons}> 
              <input defaultValue={'1'} onChange={(e) => onChangeQuantity(e)}></input>
              <button type='submit' className={styles.buttonCart}>
                  <FiShoppingCart/>               
                  ADD TO CART
              </button>
           
            
                <button  onClick={addFavorite}  className={styles.buttonFavorite}>
                  <AiFillHeart  style = {{color: `${color}` }} className={styles.heart} size={25}/>
                </button>
        
            </div>
            <div className={styles.contSucess}>
              {
                successful && <span className={styles.sucessful}>{successful}</span>
              }
            </div>
            <div className={styles.contErrors}>  
              {
                errors.quantity && <span className={styles.errors}>{errors.quantity}</span>
              }
            </div> 
          
          </form>

          
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
            
          <div className={styles.containerDescription}>
            <h3 className={styles.description}>DESCRIPTION</h3>
            <p>{productDetail.description?.length < 50 ? ('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat dicta quae eos quaerat optio, asperiores similique tempora voluptatum reiciendis debitis expedita quam impedit id exercitationem ea accusamus nostrum nemo possimus.'): productDetail.description} </p>
          </div>
        </div >

      </div>
      <Footer />
    </div>
    
  )
}