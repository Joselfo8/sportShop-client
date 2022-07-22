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
                            <h1 style={{textAlign: "center", fontSize:"50px"}} >ACCESSORIES</h1>
                        </div>
                        
                        {/* <Link to={`/${category}?category=accessories`} style={{textDecoration:"none"}}> */}
                            <div className={style.button}>
                        <Link onClick={() => filter("ACCESORIES")} to={`/${category}/ACCESSORIES`} style={{textDecoration:"none", color:"white"}}>
                                <h3>See more</h3>
                        </Link>
                            </div>

                    </div>

                </div>


                <div className={style.footwearContainer}>
                    
                    <div className={style.components}>
                    
                        <div className={style.textContainer}>
                            <h1 style={{textAlign: "center", fontSize:"50px"}}>FOOTWEAR</h1>
                        </div>

                            <div className={style.button}>
                        <Link onClick={() => filter("FOOTWEAR")} to={`/${category}/FOOTWEAR`} style={{textDecoration:"none", color:"white"}}>
                                <h3>See more</h3>
                        </Link>
                            </div>
                        
                    </div>
                    
                </div>


                <div className={style.clothesContainer}>
                    
                    <div className={style.components}>
                    
                        <div className={style.textContainer}>
                            <h1 style={{textAlign: "center", fontSize:"50px"}}>CLOTHES</h1>
                        </div>

                        {/* cambiar PANT por clothes */}
                            <div className={style.button}>
                        <Link onClick={() => filter("CLOTHES")}  to={`/${category}/CLOTHES`} style={{textDecoration:"none", color:"white"}}>
                                <h3>See more</h3>
                        </Link>
                            </div>
                        
                    </div>
                    
                </div>


            </div>

            <Footer />
        </div>
    );
};