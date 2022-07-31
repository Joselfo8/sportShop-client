import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
// Actions
import { allCategories, getUserInformation } from "../../redux/action";
import { isAdmin } from "redux/action/admin";
// import { getUser, updateUser } from "redux/action/user";
// Components
import DropDown from "./DropDown";
// Icons
import { ReactComponent as CloseIcon } from "icons/error-icon.svg";
// Images
import cart from "../../assets/cart.png";
import user from "../../assets/user.png";
import lens from "../../assets/lupa.png";
import heart from "../../assets/corazonVacio.png";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.scss";

function Menu({ products }: { products: Array<any> }) {
  const [dropDown, setDropDown]: any = useState({
    FEMALE: false,
    MALE: false,
    KIDS: false,
    SPORT: false,
  });
  const data =
    products && products.length
      ? products
          .map((e: any) => e.category)
          .filter((e: any, index: any) => {
            return products.map((e: any) => e.category).indexOf(e) === index;
          })
      : [];

  return (
    <ul className={styles.menu}>
      {data?.map((e: any, index: any) => {
        return (
          <li
            key={index}
            onMouseEnter={() => setDropDown({ [e]: true })}
            onMouseLeave={() => setDropDown({ [e]: false })}
          >
            <Link
              className={`${styles["menu-item"]} secondary`}
              key={e}
              to={`/${e}`}
            >
              {e}
            </Link>
            {dropDown[e] && <DropDown key={index} categoryClick={e} />}
          </li>
        );
      })}
    </ul>
  );
}

function SearchInput() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleOpen = (e: any) => {
    const input = inputRef.current;
    if (input && input.value.length > 0) return;

    // only toggle input if values is empty
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const handleChange = (event: any) => {
    setValue(event);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate(`/search/${value}`);
  };

  return (
    <div className={styles["search-cont"]}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={inputRef}
          className={`${styles.search} ${show ? styles["search-open"] : ""}`}
          name="search"
          type="text"
          placeholder="Search"
          id="searchProducts"
          onChange={(e) => handleChange(e.target.value)}
        />
        <button onClick={handleOpen} className={styles["search-submit"]}>
          <img className={styles.icon} src={lens} />
        </button>
      </form>
    </div>
  );
}

function Icons({
  toggleModal,
  userLogged,
}: {
  toggleModal: () => void;
  userLogged: boolean;
}) {
  return (
    <div className={`${styles.icons} secondary`}>
      <SearchInput />
      {/* if user is not logged */}
      {!userLogged ? (
        <>
          <Link to="/login" className={styles["menu-item"]}>
            Sign In
          </Link>
          <Link to="/login/r" className={styles["menu-item"]}>
            Sign up
          </Link>
        </>
      ) : (
        <>
          <div onClick={() => toggleModal()}>
            <img
              src={user}
              className={styles.icon}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div>
            <Link to="/favorites">
              <img src={heart} className={styles.icon} />
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <img src={cart} className={styles.icon} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const state = useSelector((store: any) => {
    return {
      products: store.rootReducer.categories
        ? store.rootReducer.categories.categories
        : [],
      userInfo: store.rootReducer.userInformation
        ? store.rootReducer.userInformation
        : [],
      userLogged: store.auth.isLoggedIn ? store.auth.isLoggedIn : false,
      token: store.auth.isLoggedIn ? store.auth.token : [],
      isAdmin: store.admin.isAdmin,
    };
  });

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(allCategories());
    dispatch(isAdmin(state.token));
    dispatch(getUserInformation());
  }, [dispatch]);

  const toggleModal = () => setModal((prev: boolean) => !prev);

  return (
    <nav className={styles.navbar}>
      {/* Page logo */}
      <Link to="/">
        <img src={logo} className={styles.logo} />
      </Link>
      {location.pathname === "/admin" ? (
        <Link to="/admin/addProduct">
          <button className={styles.buttonNav}>Create Product</button>
        </Link>
      ) : (
        <></>
      )}

      <div className={styles["wrapper"]}>
        <Menu products={state.products} />
        <Icons {...{ toggleModal, userLogged: state.userLogged }} />
      </div>

      <Modal
        className="secondary"
        fade={false}
        isOpen={modal}
        toggle={toggleModal}
      >
        <div className={`${styles["close-button-cont"]} primary`}>
          <button onClick={toggleModal} className={styles["close-button"]}>
            <CloseIcon />
          </button>
        </div>
        <ModalHeader>
          <span
            style={{ cursor: "pointer", paddingLeft: "1.5rem" }}
            className={styles.modalPop}
          >
            Hi {state.userInfo.name}!
          </span>
        </ModalHeader>
        <ModalBody style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/user/profile">
            <button className={styles["menu-item"]}>Go to settings</button>
          </Link>
          {state.isAdmin ? (
            <Link
              to="/admin"
              onClick={toggleModal}
              className={styles["menu-item"]}
            >
              <button className={styles["menu-item"]}>Admin</button>
            </Link>
          ) : (
            <></>
          )}
          <Link to="/login/logout">
            <button className={styles["menu-item"]}>Logout</button>
          </Link>
        </ModalBody>
      </Modal>
    </nav>
  );
}
