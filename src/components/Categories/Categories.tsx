import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Style
import style from './Categories.module.scss';

export default function Categories(){
    const state = useSelector((state: any) => state);
    console.log(state)

    return(
        <div className={style.categories}>


            <div className={style.manContainer}>
                
                <div className={style.components}>
                
                    <div className={style.textContainer}>
                        <h1>MAN</h1>
                    </div>

                        <div className={style.button}>
                    <Link to='/MAN' style={{textDecoration:"none", color:"white"}}>
                            <h3>See more</h3>
                    </Link>
                        </div>
                    
                </div>
                
            </div>

            <div className={style.womanContainer}>

                <div className={style.components}>
                
                    <div className={style.textContainer}>
                        <h1>WOMAN</h1>
                    </div>
                    
                        <div className={style.button}>
                    <Link to='/WOMAN' style={{textDecoration:"none", color:"white"}}>
                            <h3>See more</h3>
                    </Link>
                        </div>

                </div>
                
            </div>


            <div className={style.kidsContainer}>

                <div className={style.components}>
                
                    <div className={style.textContainer}>
                        <h1>KID</h1>
                    </div>
                    
                        <div className={style.button}>
                            <Link to='/KID' style={{textDecoration:"none", color:"white"}}>
                                <h3>See more</h3>
                            </Link>
                        </div>

                </div>
                
            </div>

            <div className={style.sportContainer}>

                <div className={style.components}>

                    <div className={style.textContainer}>
                        <h1>SPORT</h1>
                    </div>
                    
                        <div className={style.button}>
                    <Link to='/SPORT' style={{textDecoration:"none", color:"white"}}>
                            <h3>See more</h3>
                    </Link>
                        </div>

                </div>

            </div>


        </div>
            
    );
};