import { Link } from "react-router-dom";
// Images
import manImage from "assets/Gender/Man_1.webp";
import womanImage from "assets/Gender/Woman_1.webp";
import kidImage from "assets/Gender/Kids_1.webp";
// Styles
import style from "./Home.module.css";

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
      <Link to={link.to} className="secondary">{link.label}</Link>
      <img src={image.src} alt={image.alt} />
    </div>
  );
}

function Home() {
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

export default Home;
