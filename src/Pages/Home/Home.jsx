import React, { useContext, useState } from "react";
import styles from "./Home.module.css";
import { Loading } from "../../Components/Loading/Loading";
import { ProductContext } from "../../Context/ProductContext.jsx";
import { CartContext } from "../../Context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const {
    products,
    category,
    loading,
    cateLoading,
    setSelectedCategory,
    search,
  } = useContext(ProductContext);

  const { AddToCart } = useContext(CartContext);

  const [categorySlider, setCategorySlider] = useState(false);

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    AddToCart(id);
  };

  const handlePageDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const renderCard =
    products &&
    products
      .filter((item) => {
        return search.toLowerCase() === ""
          ? item
          : item.title.toLowerCase().includes(search);
      })
      .map((item) => {
        return (
          <div className={styles.cardProduct} key={item.id}>
            <img
              className={styles.prod_img}
              src={item.image}
              alt={item.title}
            />
            <div className={styles.prod_info}>
              <div className={styles.prod_section}>
                <span
                  className={styles.prod_title}
                  onClick={() => handlePageDetail(item.id)}
                >
                  {item.title}
                </span>
                <a
                  href="#"
                  className={styles.cartIcon}
                  onClick={(e) => handleAddToCart(e, item.id)}
                >
                  <span>
                    <ion-icon name="cart-outline"></ion-icon>
                  </span>
                </a>
              </div>

              <div className={styles.pr}>
                <span className={styles.price}>$ {item.price}</span>
                <span className={styles.rating}>
                  {item.rating.rate}{" "}
                  <span className={styles.ratingLogo}>
                    <ion-icon name="star-outline"></ion-icon>
                  </span>{" "}
                  <span className={styles.ratingCount}>
                    ({item.rating.count})
                  </span>
                </span>
              </div>
              <p
                className={styles.prod_desc}
                onClick={() => handlePageDetail(item.id)}
              >
                {item.description}
              </p>
            </div>
          </div>
        );
      });

  const categoryRender = category.map((item, index) => {
    return (
      <React.Fragment key={index}>
        <li className={styles.items}>
          <span onClick={() => setSelectedCategory(item)}>{item}</span>
        </li>
      </React.Fragment>
    );
  });

  return (
    <>
      <div
        onClick={() => setCategorySlider(!categorySlider)}
        className={`${styles.categoryBtn} ${
          categorySlider ? styles.closeCateBtn : ""
        }`}
      >
        <ion-icon name="grid-outline"></ion-icon>
      </div>
      <div className={styles.flexContainer}>
        <div
          className={`${styles.sideMenu} ${
            categorySlider ? styles.openCate : ""
          }`}
        >
          <div className={styles.menuContainer}>
            <h2 className={styles.menuTitle}>Category</h2>
            <hr />
            <ul className={styles.list}>
              {cateLoading ? (
                <Loading />
              ) : (
                <li className={styles.items}>
                  <span onClick={() => setSelectedCategory("")}>
                    Show all Products
                  </span>
                </li>
              )}
              {cateLoading ? null : categoryRender}
            </ul>
          </div>
        </div>

        <div className={styles.productSection}>
          <div className={styles.container}>
            {loading ? <Loading /> : renderCard}
          </div>
        </div>
      </div>
    </>
  );
};
