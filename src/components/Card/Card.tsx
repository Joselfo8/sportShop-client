import { Link } from "react-router-dom";
import style from './Card.module.scss'

export default function Card({key, id, image, title, price}: any){
    return(
            <Link to={`/home/${id}`} key={key}>
                <div className={style.card}>
                    <div >
                        <img className={style.flag} src={image} alt={title}/>
                    </div>

                    <div className={style.textContainer}>
                        <h4 className={style.text}>{title}</h4>
                        <h4 className={style.text}>{`$ ${price}`}</h4>
                    </div>
                </div>
            </Link>
    );
};