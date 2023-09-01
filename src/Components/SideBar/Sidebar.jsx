import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "./Sidebar.module.css";
import PropTypes from "prop-types";

export const Sidebar = (props) => {
  const { slider, setSlider } = props;

  const { cart, AddToCartOne, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  const handleIncrease = (id, qty) => {
    AddToCartOne(id, qty + 1);
  };

  const handleDecrease = (id, qty) => {
    AddToCartOne(id, qty <= 1 ? qty : qty - 1);
  };

  const getTotalAmount = () => {
    const totalAmount = cart.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.quantity * cartItem.price;
    }, 0);

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    setTotal(formatter.format(totalAmount));
  };

  useEffect(() => {
    getTotalAmount();
  }, [cart]);

  const renderCartProducts =
    cart &&
    cart.map((cart) => {
      return (
        <div className={styles.cardProducts} key={cart.id}>
          <div className={styles.nameImage}>
            <img src={cart.image} alt={cart.title} className={styles.cartImg} />
            <div className={styles.namePrice}>
              <h5 className={styles.cartName}>{cart.title}</h5>
              <p className={styles.cartPrice}>$ {cart.price}</p>
            </div>
          </div>

          <div className={styles.quantityAdjust}>
            <button
              className={styles.addQty}
              onClick={() => handleIncrease(cart.id, cart.quantity)}
            >
              +
            </button>
            <p className={styles.quantity}>{cart.quantity}</p>
            <button
              className={styles.subQty}
              onClick={() => handleDecrease(cart.id, cart.quantity)}
            >
              -
            </button>
          </div>

          <div className={styles.deleteBtn}>
            <button
              className={styles.delBtn}
              onClick={() => removeFromCart(cart.id)}
            >
              X
            </button>
          </div>
        </div>
      );
    });

  return (
    <>
      <div
        className={`${styles.overlay} ${slider ? styles.showOverlay : ""}`}
        onClick={() => setSlider(!slider)}
      ></div>
      <div className={`${styles.SideBar} ${slider ? styles.show : ""}`}>
        <div className={styles.container}>
          <div className={styles.box}>
            <h1 className={styles.cart_title}>Cart</h1>
            <p className={styles.total_price}>{total}</p>
          </div>
          <div className={styles.items_container}>
            {cart.length === 0 ? (
              <p className={styles.nothing}>{`Nothing to show here :/`}</p>
            ) : (
              renderCartProducts
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  slider: PropTypes.bool,
  setSlider: PropTypes.func,
};
