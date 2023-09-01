import { useContext, useEffect, useState } from "react";
import styles from "./productDetail.module.css";
import { Loading } from "../../Components/Loading/Loading";
import { CartContext } from "../../Context/CartContext.jsx";
import { useParams } from "react-router-dom";

export const ProductDetail = () => {
  const { productId } = useParams();
  const { oneProduct, setProductId, AddToCartOne } = useContext(CartContext);
  const [qty, setQty] = useState(0);

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  const handleDecrease = () => {
    qty <= 1 ? qty : setQty(qty - 1);
  };

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    AddToCartOne(id, qty);
  };

  useEffect(() => {
    setProductId(productId);
  }, []);

  useEffect(() => {
    if (oneProduct !== null) setQty(oneProduct.quantity);
  }, [oneProduct]);

  const renderDetailProduct = () => {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.productImage}>
            <img
              src={oneProduct.image}
              alt={oneProduct.title}
              className={styles.productImg}
            />
          </div>
          <div className={styles.productDetails}>
            <div className={styles.details}>
              <h1 className={styles.title}>{oneProduct.title}</h1>
              <div className={styles.pr}>
                <h4 className={styles.price}>$ {oneProduct.price}</h4>
                <a href="#" className={styles.rating}>
                  {oneProduct.rating.rate}
                  <span className={styles.ratingLogo}>
                    <ion-icon name="star-outline"></ion-icon>
                  </span>
                  <span className={styles.ratingCount}>
                    ({oneProduct.rating.count})
                  </span>
                </a>
              </div>

              <div className={styles.quantity}>
                <label htmlFor="quantity" className={styles.qtyLabel}>
                  Quantity
                </label>
                <button
                  className={styles.decQty}
                  onClick={() => handleDecrease()}
                >
                  -
                </button>
                <p className={styles.qtyValue} id="quantity">
                  {qty === 0 ? 1 : qty}
                </p>
                <button
                  className={styles.incQty}
                  onClick={() => handleIncrease()}
                >
                  +
                </button>
              </div>

              <p className={styles.description}>{oneProduct.description}</p>
              <div className={styles.btncontainer}>
                <button
                  className={styles.Check_out}
                  onClick={(e) => handleAddToCart(e, oneProduct.id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {oneProduct == null ? (
        <div style={{ height: "400px", paddingTop: "150px" }}>
          {" "}
          <Loading />{" "}
        </div>
      ) : (
        renderDetailProduct()
      )}
    </>
  );
};
