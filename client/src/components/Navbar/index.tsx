import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Actions
import { allCategories, getUserInformation } from "redux/action";
import { isAdmin } from "redux/action/admin";
// Components
import DropDown from "./DropDown";
// Images
import cart from "assets/cart.png";
import user from "assets/user.png";
import lens from "assets/lupa.png";
import heart from "assets/corazonVacio.png";
import logo from "assets/logo.png";
// Styles
import styles from "./Navbar.module.css";

function MenuItem({ label, to }: { label: string; to: string }) {
  const [dropDown, setDropDown] = useState(false);

  return (
    <li
      onMouseEnter={() => setDropDown(true)}
      onMouseLeave={() => setDropDown(false)}
    >
      <Link className={`${styles["menu-item"]}`} to={to}>
        {label}
      </Link>
      {dropDown && <DropDown category={label} />}
    </li>
  );
}

function Menu({ products }: { products: Array<any> }) {
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
      {data?.map((category: any) => {
        return (
          <MenuItem
            key={`${category}-unique-key`}
            label={category}
            to={`/${category}`}
          />
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
          <img className={styles.icon} src={lens} alt="search-icon" />
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
    <div className={`${styles.icons}`}>
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
              alt="user-icon"
            />
          </div>

          <div>
            <Link to="/favorites">
              <img src={heart} className={styles.icon} alt="favorites-icon" />
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <img src={cart} className={styles.icon} alt="cart-icon" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const {
    token,
    products,
    userLogged,
    userInfo,
    isAdmin: isAdminValue,
  } = useSelector((store: any) => {
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

  // useEffect(() => {
  //   dispatch(allCategories());
  //   dispatch(isAdmin(token));
  //   dispatch(getUserInformation());
  // }, [dispatch, token]);

  const toggleModal = () => setModal((prev: boolean) => !prev);

  return (
    <nav className={`${styles["navbar"]}`}>
      {/* Page logo */}
      <Link to="/">
        <img src={logo} className={styles.logo} alt="vlixes-logo" />
      </Link>
      {location.pathname === "/admin" ? (
        <Link to="/admin/addProduct">
          <button className={styles["menu-item"]}>Create Product</button>
        </Link>
      ) : (
        <></>
      )}

      <div className={styles["wrapper"]}>
        <Menu products={products} />
        <Icons {...{ toggleModal, userLogged: userLogged }} />
      </div>
    </nav>
  );
}

export default Navbar;
