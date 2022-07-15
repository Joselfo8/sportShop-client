import { Link } from "react-router-dom";

// Style
import style from './Categories.module.scss';

export default function Categories(){
    return(
        <div className={style.categories}>

                <div className={style.manContainer}>
                    
                    <div className={style.components}>
                    
                        <div className={style.textContainer}>
                            <h1 style={{textAlign: "center", fontSize:"50px"}}>Man</h1>
                        </div>

                        <Link to='/male' style={{textDecoration:"none"}}>
                            <div className={style.button}>
                                <h3>See more</h3>
                            </div>
                        </Link>
                        
                    </div>
                    
                </div>

                <div className={style.womanContainer}>

                    <div className={style.components}>
                    
                        <div className={style.textContainer}>
                            <h1 style={{textAlign: "center", fontSize:"50px"}} >Woman</h1>
                        </div>
                        
                        <Link to='/female' style={{textDecoration:"none"}}>
                            <div className={style.button}>
                                <h3>See more</h3>
                            </div>
                        </Link>

                    </div>
                    
                </div>


                <div className={style.kidsContainer}>

                    <div className={style.components}>
                    
                        <div className={style.textContainer}>
                            <h1 style={{textAlign: "center", fontSize:"50px"}} >Kid</h1>
                        </div>
                        
                        <Link to='/kid' style={{textDecoration:"none"}}>
                            <div className={style.button}>
                                <h3>See more</h3>
                            </div>
                        </Link>

                    </div>
                    
                </div>

            </div>
            
    );
};