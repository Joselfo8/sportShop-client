import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isAdmin } from "redux/action/admin";
import { editProduct, getDetails} from "../../../redux/action";
import NavBar from "../../Navbar/Navbar";
import styles from './FormProduct.module.scss'
import validateProducts from './validateForms'

interface Errors{
    title: string,
    category:string,
    subCategory:string,
    price: string,
    description:string,
    product_care:string,
    sizes:string,
    // image:string
}

export default function EditProduct(){

    //HOOKS
    const dispatch = useDispatch();
    const params = useParams()
    const navigate = useNavigate()


    // ESTADOS 
    const product = useSelector((state:any) => state.rootReducer.details);
    
    const [errors,setErorrs] = useState<Errors>({
        title: '',
        category:'',
        subCategory:'',
        price: '',
        description:'',
        product_care:'',
        sizes:''
        // image:''
      })
    
    const [misProductos, setMisProductos ]: any= useState({
        title: "",
        price: '',
        description: "",
        category: "",
        subCategory: "",
        product_care: "",
        image: "",
        rating: '',
        rating_count: ''
    });

    const token = useSelector((state:any) => state.auth.token);

  
    const admin : boolean = useSelector((state : any) => state.admin.isAdmin);

    // USE EFFECT 
    useEffect(() =>{
        dispatch(getDetails(params.id))
    }, []);

    useEffect(() =>{
        setMisProductos(product)
    }, [product]);

    
    useEffect(() => {
        dispatch(isAdmin(token))
      }, [token]);

    //HANDLES
    const handleChange = (e:any) => {
        e.preventDefault();
        setMisProductos({
            ...misProductos,
            [e.target.name]: e.target.value
        })  
        setErorrs(validateProducts({
            ...misProductos,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (Object.values(errors).filter(p=> p !== '').length !== 0){
            return (alert('Check your mistakes!'))
        }else {
            let text = "Are you sure you want to edit the product?";
            if (window.confirm(text) == true) {
                const edit = {
                    id: misProductos.id,
                    title: misProductos.title,
                    category:misProductos.category,
                    subCategory:misProductos.subCategory,
                    price: misProductos.price,
                    description:misProductos.description,
                    product_care:misProductos.product_care,
                }
                dispatch(editProduct(edit))
                e.target.reset()
                navigate('/admin')
            } else {
                navigate(`/admin/editProduct/${misProductos.id}`);      
            }
        }

    }


    if(admin){
        return(
            <div >
                <NavBar/>
                
                
                    {misProductos ?
                            <form onSubmit={handleSubmit}  className={styles.containerForm}>
                                <h1>EDIT PRODUCT</h1>
                                <label>TITLE</label>
                                <input
                                    className={styles.inputGeneral}
                                    onChange={(e)=>handleChange(e)}
                                    type= 'text'
                                    name= 'title'
                                    placeholder='Insert name of product'
                                    value={misProductos.title}
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
                                    value={misProductos.category}
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
                                    value={misProductos.subCategory}
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
                                    value={misProductos.price}
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
                                        value={misProductos.description}
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
                                        value={misProductos.product_care}
                                    >                    
                                </input>
                                {errors.product_care && (<span>{errors.product_care}</span>)}
                                <button type='submit'>EDIT PRODUCT</button>
                    </form>  
                        : null
                    }
            </div>
        )
    } else{
       return (
       <div className={styles.notAdmin}>
        <h1>You are not admin</h1>
        <Link to='/'>
            <button>« Back home</button>
        </Link>
       </div>)
    }

    
}