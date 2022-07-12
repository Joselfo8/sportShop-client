import React from 'react'
import NavBar from '../Navbar/Navbar'
import styles from './Favorites.module.scss'
import camiseta from './camiseta.jpg'
import { Link } from 'react-router-dom'
import cart from '../../assets/cart.png';


export default function Favorites(){
  return (
    <div>
        <NavBar/>
        <h1>Mi Lista de deseos</h1>
        <div className={styles.favorites}>
            

            <div className={styles.gridLayout}>

                <div className={styles.col1}>
                    <img src={camiseta} alt='cargando' className={styles.imgProduct}/>
                    <p>Price</p>
                    <p>Name</p>
                    <p className={styles.cantidad}>Cantidad</p>
                    <input type='text'></input>
                    <Link to='/cart' className={styles.link}>
                        <button>
                            <img src={cart} alt='' className={styles.icon}/>
                            ADD TO CART
                        </button>   
                    
                    </Link>
                                 
                </div>

                <div className={styles.col2}> 
                    <button>Delete »</button>
                    <Link to = '/home'>
                        <button>Edit »</button>
                    </Link>                                
                </div>
                
            </div>

        </div>
       
    </div>
  )
}