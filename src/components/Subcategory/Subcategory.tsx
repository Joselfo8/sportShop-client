import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductsByCategoryAndSubcategory } from '../../redux/action/index';

// Components
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// Style
import style from './Subcategories.module.scss';

export default function Subcategory(){
    const dispatch = useDispatch()
    let { category } = useParams();

    function filter(argument: any) {
        dispatch(getProductsByCategoryAndSubcategory({category: category, argument: argument}))
    }

    return (
        <div>
            <NavBar />

            <div className={style.Subcategories}>

                <div className={style.accessoriesContainer}>

                    <div className={style.components}>

                        <div className={style.textContainer}>
                            <h1 style={{textAlign: "center", fontSize:"50px"}} >Accessories</h1>
                        </div>
                        
                        {/* <Link to={`/${category}?category=accessories`} style={{textDecoration:"none"}}> */}
                        <Link onClick={() => filter("accessories")} to='/products' style={{textDecoration:"none"}}>
                            <div className={style.button}>
                                <h3>See more</h3>
                            </div>
                        </Link>

                    </div>

                </div>


                <div className={style.footwearContainer}>
                    
                    <div className={style.components}>
                    
                        <div className={style.textContainer}>
                            <h1 style={{textAlign: "center", fontSize:"50px"}}>Footwear</h1>
                        </div>

                        <Link onClick={() => filter("footwear")} to='/products' style={{textDecoration:"none"}}>
                            <div className={style.button}>
                                <h3>See more</h3>
                            </div>
                        </Link>
                        
                    </div>
                    
                </div>


                <div className={style.clothesContainer}>
                    
                    <div className={style.components}>
                    
                        <div className={style.textContainer}>
                            <h1 style={{textAlign: "center", fontSize:"50px"}}>Clothes</h1>
                        </div>

                        {/* cambiar PANT por clothes */}
                        <Link onClick={() => filter("pant")}  to='/products' style={{textDecoration:"none"}}>
                            <div className={style.button}>
                                <h3>See more</h3>
                            </div>
                        </Link>
                        
                    </div>
                    
                </div>


            </div>

            <Footer />
        </div>
    );
};