import { Link } from "react-router-dom";
// Images
import manImage from "assets/Gender/Man_1.jpeg";
import womanImage from "assets/Gender/Woman_2.jpg";
import kidImage from "assets/Gender/Kids_1.jpg";
// Style
import style from "./Categories.module.scss";

function Category({
  title,
  link = { to: "", label: "See more" },
  image = { src: "", alt: "Category image" },
}: {
  title: string;
  link: { to: string; label?: string };
  image: { src: string; alt?: string };
}) {
  return (
    <div className={style.container}>
      <span>{title}</span>
      <Link to={link.to}>{link.label}</Link>
      <img src={image.src} alt={image.alt} />
    </div>
  );
}

export default function Categories() {
  return (
    <div className={style.categories}>
      <Category
        title="MAN"
        link={{ to: "/MAN", label: "See more" }}
        image={{ src: manImage, alt: "Go to man products" }}
      />
      <Category
        title="WOMAN"
        link={{ to: "/WOMAN", label: "See more" }}
        image={{ src: womanImage, alt: "Go to woman products" }}
      />
      <Category
        title="KID"
        link={{ to: "/KID", label: "See more" }}
        image={{ src: kidImage, alt: "Go to kid products" }}
      />
    </div>
  );
}
