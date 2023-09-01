import { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();

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

  const renderCardCart =
    cart &&
    cart.map((cart, index) => {
      return (
        <div className={styles.productCard} key={cart.id}>
          <p className={styles.sr}>{index + 1}. </p>
          <img src={cart.image} alt={cart.title} className={styles.CardImg} />
          <div className={styles.tp}>
            <h2
              className={styles.title}
              onClick={() => navigate(`/product-detail/${cart.id}`)}
            >
              {cart.title}
            </h2>
            <p className={styles.price}>$ {cart.price}</p>
          </div>

          <div className={styles.quantityAdjust}>
            <button
              className={styles.subQty}
              onClick={() => handleDecrease(cart.id, cart.quantity)}
            >
              -
            </button>
            <p className={styles.quantity}>{cart.quantity}</p>
            <button
              className={styles.addQty}
              onClick={() => handleIncrease(cart.id, cart.quantity)}
            >
              +
            </button>
          </div>

          <div className={styles.deleteBtn}>
            <button
              className={styles.delBtn}
              onClick={() => removeFromCart(cart.id)}
            >
              remove
            </button>
          </div>
        </div>
      );
    });

  return (
    <>
      <div className={styles.CartContainer}>
        <div className={styles.CartTitle}>
          <div className={styles.box}>
            <h1 className={styles.CartTitleHeading}>Cart</h1>
            <h4 className={styles.totalPrice}>Total: &nbsp; {total}</h4>
          </div>
        </div>

        {renderCardCart}
      </div>
    </>
  );
};
