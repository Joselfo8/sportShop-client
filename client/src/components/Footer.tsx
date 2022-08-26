import { Link } from "react-router-dom";
// Icons
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
// Styles
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["info"]}>
        <h5>Company Info</h5>
        <Link to="/about" className={styles["link"]}>
          About Us
        </Link>
      </div>

      <div className={styles["social-networks"]}>
        <h5>Follow Us</h5>
        <div>
          <a
            href="https://www.facebook.com/Vlixes-101555312632369"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["footer-icon"]}
          >
            <AiFillFacebook />
          </a>
          <a
            href="https://www.instagram.com/vlixes_ok"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["footer-icon"]}
          >
            <AiFillInstagram />
          </a>
          <a
            href="https://twitter.com/vlixes_ok"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["footer-icon"]}
          >
            <AiFillTwitterSquare />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
