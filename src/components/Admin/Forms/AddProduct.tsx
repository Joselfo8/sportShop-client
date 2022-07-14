import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct, getProducts } from '../../../redux/action'

import styles from './AddProduct.module.scss'
import validateProducts from './validateForms'
interface Errors{
    title: string,
    category:string,
    subCategory:string,
    price: string,
    description:string,
    product_care:string,
    sizes:string,
    image:string
}

const FormProducts = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()  

    
  //ESTADOS:
  const [errors,setErorrs] = useState<Errors>({
    title: '',
    category:'',
    subCategory:'',
    price: '',
    description:'',
    product_care:'',
    sizes:'',
    image:''
  })

  const [input, setInput] = useState({
    title:'',
    category: '',
    subCategory:'',
    price: '', 
    description:'',
    product_care: '',
    sizes: '',
    image:''
  })  

  const allProducts = useSelector((state:any) => state.products)
  

  //HANDLES
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
    let imageExist = allProducts?.filter((p:any) => p.image === input.image)

    
    //VALIDACION ON SUBMIT
    if(titleExist.length !== 0){
        return (alert('Title already exists'))
    } else if(imageExist.length !== 0) {
        return (alert('Image already exists'))
    } else if (Object.values(errors).filter(p=> p !== '').length !== 0){
        return (alert('Check your mistakes!'))
    } else {
        let text = "Are you sure you want to add the product?";
        if (window.confirm(text) == true) {
            const newProduct = {
                title: input.title,
                category:input.category,
                subCategory:input.subCategory,
                price: input.price,
                description:input.description,
                product_care:input.product_care,
                image:input.image
            }
            dispatch(addProduct(newProduct))
            e.target.reset()
            navigate('/admin/addProduct')
        } else {
            navigate('/admin/addProduct');      
        }
        
        
    }
  }  

  
  useEffect(() => {
    dispatch(getProducts())  
  }, [dispatch])


  return (
    <div >
        <h1>ADD PRODUCT</h1>
        <div >
            <form onSubmit={handleSubmit} className={styles.containerForm}>

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
                    onChange={(e)=>handleChange(e)}
                    placeholder="https://example.com"
                    name='image'
                    type='text'
                >
               </input>
               {errors.image && (<span>{errors.image}</span>)}

                  {/* Stock? */}
                {/* <label>SIZES</label>
                <input
                    onChange={(e)=>handleChange(e)}
                    value={input.sizes}
                    type= 'text'
                    name= 'sizes'
                >
                </input> */}
              
               <button type='submit'>ADD PRODUCT</button>
            </form>         
        </div>    
    </div>
  )
}

export default FormProducts