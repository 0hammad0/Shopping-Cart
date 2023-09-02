import styles from "./Header.module.css";
import Logo from "../../assets/images/Logo.jpg";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { CartContext } from "../../Context/CartContext";
import PropTypes from "prop-types";

export const Header = (props) => {
  const { slider, setSlider } = props;

  const { setSearch } = useContext(ProductContext);
  const { cart } = useContext(CartContext);

  const [hamburger, setHamburger] = useState(false);

  return (
    <>
      <div
        className={`${hamburger ? styles.overlay : ""}`}
        onClick={() => setHamburger(!hamburger)}
      ></div>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <NavLink to="/">
            <img src={Logo} alt="Easy Shope Logo" className={styles.logoImg} />
          </NavLink>

          <ul className={`${styles.list} ${hamburger ? styles.nav__open : ""}`}>
            <li className={styles.list_items}>
              <input
                type="search"
                placeholder="search..."
                className={styles.search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </li>
            <li className={styles.list_items}>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? styles.item
                    : isActive
                    ? `${styles.item} ${styles.active}`
                    : styles.item
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.list_items}>
              <NavLink
                to="/cart"
                className={({ isActive, isPending }) =>
                  isPending
                    ? styles.item
                    : isActive
                    ? `${styles.item} ${styles.active}`
                    : styles.item
                }
              >
                Cart
              </NavLink>
            </li>
            <li
              className={styles.list_items}
              onClick={() => setSlider(!slider)}
            >
              <a className={`${styles.item} ${styles.cart}`}>
                <span
                  className={`${
                    cart.length === 0 ? styles.cartCountHide : styles.cartCount
                  }`}
                >
                  {cart.length}
                </span>
                <ion-icon name="cart-outline"></ion-icon>
              </a>
            </li>
          </ul>

          <div className={styles.right_nav}>
            <NavLink to="/cart" className={`${styles.item} ${styles.cart}`}>
              <span
                className={`${
                  cart.length === 0 ? styles.cartCountHide : styles.cartCount
                }`}
              >
                {cart.length}
              </span>
              <ion-icon name="cart-outline"></ion-icon>
            </NavLink>

            <div
              className={`${styles.hamburger} ${
                hamburger ? styles.hamburger__open : ""
              }`}
              onClick={() => setHamburger(!hamburger)}
            >
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

Header.propTypes = {
  slider: PropTypes.bool,
  setSlider: PropTypes.func,
  setSearch: PropTypes.func,
};
