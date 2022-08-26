import { Link } from "react-router-dom";
// Styles
import style from "./Card.module.css";

function Card({ id, image, title, category, price }: any) {
  return (
    <Link to={`/products/${id}`} style={{ textDecoration: "none", width: "0" }}>
      <div className={style.card}>
        <div>
          <img className={style.flag} src={image} alt={title} />
        </div>

        <div className={style.textContainer}>
          <h4 className={style.text}>{title}</h4>
          <p className={style.text}>{category}</p>
          <h4 className={style.text}>{`$ ${price}`}</h4>
        </div>
      </div>
    </Link>
  );
}

export default Card;
