import { Link } from "react-router-dom";

// Style
import style from './Categories.module.scss';

export default function Categories(){
    return(
        <div className={style.categories}>


            <div className={style.manContainer}>
                
                <div className={style.components}>
                
                    <div className={style.textContainer}>
                        <h1>MAN</h1>
                    </div>

                    <Link to='/MAN' style={{textDecoration:"none"}}>
                        <div className={style.button}>
                            <h3>See more</h3>
                        </div>
                    </Link>
                    
                </div>
                
            </div>

            <div className={style.womanContainer}>

                <div className={style.components}>
                
                    <div className={style.textContainer}>
                        <h1>WOMAN</h1>
                    </div>
                    
                    <Link to='/WOMAN' style={{textDecoration:"none"}}>
                        <div className={style.button}>
                            <h3>See more</h3>
                        </div>
                    </Link>

                </div>
                
            </div>


            <div className={style.kidsContainer}>

                <div className={style.components}>
                
                    <div className={style.textContainer}>
                        <h1>KID</h1>
                    </div>
                    
                    <Link to='/KID' style={{textDecoration:"none"}}>
                        <div className={style.button}>
                            <h3>See more</h3>
                        </div>
                    </Link>

                </div>
                
            </div>

            <div className={style.sportContainer}>

                <div className={style.components}>

                    <div className={style.textContainer}>
                        <h1>SPORT</h1>
                    </div>
                    
                    <Link to='/SPORT' style={{textDecoration:"none"}}>
                        <div className={style.button}>
                            <h3>See more</h3>
                        </div>
                    </Link>

                </div>

            </div>


        </div>
            
    );
};