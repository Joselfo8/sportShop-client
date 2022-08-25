import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import styles from "./About.module.scss";

export default function(){
    return(
        <div>
            <NavBar />

            <div className={styles.bodyAbout}>
                <div className={styles.card}>
                <h1>About us</h1>
                <span>
                We are a team of eight people who
                ventured into a group
                project which is to create an e-commerce page
                for the Henry Academy.
                </span>
                </div>
            </div>

            <Footer/>
        </div>
    )
}