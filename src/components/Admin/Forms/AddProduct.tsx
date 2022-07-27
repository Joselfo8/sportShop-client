import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isAdmin } from 'redux/action/admin'
import { addProduct, getProducts } from '../../../redux/action'
import NavBar from '../../Navbar/Navbar'

import styles from './FormProduct.module.scss'
import validateProducts from './validateForms'


const FormProducts = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()  

    
  //ESTADOS:
  const [errors,setErorrs]:any = useState({
    title: '',
    category:'',
    subCategory:'',
    price: '',
    description:'',
    product_care:'',
    sizes:'',
    image:''
  })

  const [image, setImage]:any = useState()
  
  const [preview, setPreview]:any = useState()

  const [input, setInput]:any = useState({
    title:'',
    category: '',
    subCategory:'',
    price: '', 
    description:'',
    product_care: '',
    sizes: '',
    // image: null
  })  

  const token = useSelector((state:any) => state.auth.token);

  useEffect(() => {
    dispatch(isAdmin(token))
  }, [token]);

  const admin : boolean = useSelector((state : any) => state.admin.isAdmin);

  const allProducts = useSelector((state:any) => state.rootReducer.products)
  

  //HANDLES
  const handleChangeImage = (e:any) => {
    const file = e.target.files[0]
    if(file && file.type.substr(0,5) === "image") {
        setImage(file)
    } else {
        setImage(null)
    } 
  }

  const handleChange = (e:any) => {
    e.preventDefault()
    
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
  
    setErorrs(validateProducts({
        ...input,
        [e.target.name] : e.target.value
    }))
    
  }


  const handleSubmit = (e:any) => {
    e.preventDefault()
   
    //VARIABLES PARA VALIDAR
    let titleExist = allProducts?.filter((p:any) => p.title.toLowerCase() === input.title.toLowerCase())
    let imageExist = allProducts?.filter((p:any) => p.image === preview)

    
    //VALIDACION ON SUBMIT
    if(titleExist.length !== 0){
        return (alert('Title already exists'))
    } else if(imageExist.length !== 0){
        return (alert('Title already exists'))
    } else if (Object.values(errors).filter(p=> p !== '').length !== 0){
        return (alert('Check your mistakes!'))
    }else {
        let textConfirm:string = "Are you sure you want to add the product?";
        
        if (window.confirm(textConfirm) === true) {
            const newProduct = {
                title: input.title,
                category:input.category.toUpperCase(),
                subCategory:input.subCategory.toUpperCase(),
                price: input.price,
                description:input.description,
                product_care:input.product_care,
                image: btoa(preview)
            }
            dispatch(addProduct(newProduct))
            e.target.reset()
            navigate('/admin/addProduct')
            
        } else {
            navigate('/admin/addProduct');      
        }
        
        
    }
  }  


  // CICLOS DE VIDA 
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    dispatch(getProducts())  
  }, [dispatch])

  if(admin){
    return (
      <div >
        <NavBar/>  
          <div >
          
              <form onSubmit={handleSubmit} className={styles.containerForm}>
                  <h1>ADD PRODUCT</h1>
                  <label>TITLE</label>
                  <input
                      className={styles.inputGeneral}
                      onChange={(e)=>handleChange(e)}
                      type= 'text'
                      name= 'title'
                      placeholder='Insert name of product'
                  >
                  </input>
                  {errors.title && (<span>{errors.title}</span>)}
    
                  <label>CATEGORY</label>
                  <input
                      className={styles.inputGeneral}
                      onChange={(e)=>handleChange(e)}
                      type= 'text'
                      name= 'category'
                      placeholder='Insert category of product'
                  >
                  </input>
                  {errors.category && (<span>{errors.category}</span>)}
                 
                 <label>SUB-CATEGORY</label>
                 <input
                      className={styles.inputGeneral}
                      onChange={(e)=>handleChange(e)}
                      type= 'text'
                      name= 'subCategory'
                      placeholder='Insert Sub category of product'
                  >
                 </input>
                 {errors.subCategory && (<span>{errors.subCategory}</span>)}
  
                 <label>PRICE</label>
                 <input
                      className={styles.inputGeneral}
                      onChange={(e)=>handleChange(e)}
                      type= 'text'
                      name= 'price'
                      placeholder='Insert price of product'
                  >
  
                 </input>
                 {errors.price && (<span>{errors.price}</span>)}
  
                 <label>DESCRIPTION</label>
                 <input
                      className={styles.inputDescription}
                      onChange={(e)=>handleChange(e)}
                      type= 'text'
                      name= 'description'
                      placeholder='Insert description of product'
                      
                  >   
                 </input>
                 {errors.description && (<span>{errors.description}</span>)}
  
                 <label>PRODUCT CARE</label>
                 <input
                      className={styles.inputGeneral}
                      onChange={(e)=>handleChange(e)}
                      type= 'text'
                      name= 'product_care'
                      placeholder='Insert product care'
                  >                    
                 </input>
                 {errors.product_care && (<span>{errors.product_care}</span>)}
  
                 <label>IMAGE</label>
                 <input
                      className={styles.inputGeneral}
                      onChange={handleChangeImage}
                      name='image'
                      type='file'
                      accept='image/*'
                  >
                 </input>
                 {errors.image && (<span>{errors.image}</span>)}
                 <button type='submit'>ADD PRODUCT</button>
              </form>         
          </div>    
      </div>
    )
  } else {
    return (
    <div className={styles.notAdmin}>
      <h1>You are not admin</h1>
      <Link to='/'>
          <button>« Back home</button>
      </Link>
     </div>)
  }
  
}

export default FormProducts