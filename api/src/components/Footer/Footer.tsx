import React from "react";
import { Link, useLocation } from "react-router-dom";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import phone from "../../assets/phone.png";
import email from "../../assets/email.png";
import styles from './Footer.module.scss';

export default function Footer(){
    const location = useLocation();

    return(
        <div className={styles.footerMain}>
            <div className={styles.info}>
                <h5>COMPANY INFO</h5>
                <Link to='/about' style={{textDecoration:"none", color:"black", fontSize:"12px"}}>
                    <span className={styles.infoSpan}>About Us</span>
                </Link>
            </div>

            {
                location.pathname === '/about' ?
                <div className={styles.contact}>
                    <h5>CONTACT US</h5>
                    <div className={styles.orderMail}>
                        <img src={email} style={{height:"15px", width:"15px"}}/>
                        <span>vlixes.international@gmail.com</span>
                    </div>
                    <div className={styles.orderPhone}>
                        <img src={phone} style={{height:"15px", width:"15px"}}/>
                        <span>0800-XXX-XXX</span>
                    </div>
                </div>
                : <></>
            }

            <div className={styles.networks}>
                <h5>FOLLOW US</h5>
                <div className={styles.iconsOrder}>
                    <a href="https://www.facebook.com/Vlixes-101555312632369"><img src={facebook} className={styles.icons}/></a>
                    <a href="https://www.instagram.com/vlixes_ok"><img src={instagram} className={styles.icons}/></a>
                    <a href="https://twitter.com/vlixes_ok"><img src={twitter} className={styles.icons}/></a>
                </div>
            </div>
        </div>
    )
}