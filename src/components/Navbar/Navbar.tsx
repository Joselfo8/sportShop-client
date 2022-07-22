import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {allCategories} from "../../redux/action";
import styles from "./NavBar.module.scss";
import cart from "../../assets/cart.png";
import user from "../../assets/user.png";
import lens from "../../assets/lupa.png";
import heart from "../../assets/corazonVacio.png";
import DropDown from "./DropDown";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';

export default function NavBar() {
  const location = useLocation();
  const state = useSelector((store: any) => {
    return {
        products: store.rootReducer.categories.categories,
        userLoged: store.auth.isLoggedIn,
        userDate: store.auth.isLoggedIn ? store.auth.auth.user : []
    }
});
const [value, setValue] = useState('');
const dispatch = useDispatch();
const navigate = useNavigate();
const [dropDown, setDropDown]: any = useState({
  FEMALE: false,
  MALE: false,
  KIDS: false,
  SPORT: false,
});
const [modal, setModal] = useState(false);

useEffect(() => {
  dispatch(allCategories());
}, []);

function handleChange(event: any) {
    setValue(event);
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    navigate(`/search/${value}`);
  };

  const togleModal = () => setModal(!modal);

  let data = state.products?.map((e:any) => e.category).filter((e : any, index : any) => {
    return state.products.map((e:any) => e.category).indexOf(e) === index
  });
  return (
    <div className={styles.navBar}>
      <Link to="/">
        <img src={logo} className={styles.logo} />
      </Link>
        { location.pathname === "/admin" ?
          <Link to="/admin/addProduct"><button className={styles.buttonNav}>Create Product</button></Link>
          : <></>
        }

      <ul className={styles.navItems}>
        {
          data?.map((e: any) => {
          return (
            <li
              className={styles.cName}
              onMouseEnter={() => setDropDown({ [e]: true })}
              onMouseLeave={() => setDropDown({ [e]: false })}
              key={e}
            >
              <Link to={`/${e}`}>
                <button className={styles.buttonNav}>{e}</button>
              </Link>
              {dropDown[e] && <DropDown categoryClick={e} />}
            </li>
          );
        })}
      </ul>

      <div className={styles.orderIcons}>

        <div className={styles.bodySearch}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className={styles.search}
              name="search"
              type="text"
              placeholder="Search"
              id="searchProducts"
              onChange={(e) => handleChange(e.target.value)}
            />
          </form>
          <img src={lens} className={styles.search_submit} />
        </div>

        <div onClick={() => {state.userLoged && togleModal()}}>
          { state.userLoged ?
            <img src={user} className={styles.cart} style={{cursor:"pointer"}} /> :
            <Link to="/login">
              <img src={user} className={styles.cart} />
            </Link>
          }
        </div>

        <div>
        <Link to={state.userLoged ? "/favorites" : "/login"}>
          <img src={heart} className={styles.heart} />
        </Link>
        </div>
        <div>
        <Link to={state.userLoged ? "/cart" : "/login"}>
          <img src={cart} className={styles.cart} />
        </Link>
        </div>

      <Modal
      fade={false}
      isOpen={modal}
      toggle={togleModal}
      >
        <button onClick={togleModal} className={styles.buttonNav} style={{marginLeft:"auto", width:"3rem", backgroundColor:"black",color:"white"}}>X</button>
        <ModalHeader>
          <span style={{cursor:"pointer",paddingLeft:"1.5rem"}} className={styles.modalPop}>Hi {state.userDate.name}!</span>
        </ModalHeader>
        <ModalBody style={{display:"flex", justifyContent:"center"}}>
          <Link to="/user/profile"><button className={styles.buttonNav}>Go to settings</button></Link>
          { state.userDate.role === "admin" ?
            <Link to="/admin" onClick={togleModal} className={styles.buttonNav}><button className={styles.buttonNav}>Admin</button></Link>
            : <></>
          }
          <Link to="/login/logout"><button className={styles.buttonNav}>Logout</button></Link>
        </ModalBody>
      </Modal>
      </div>

    </div>
  );
}
