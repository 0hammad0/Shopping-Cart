import styles from "./Footer.module.css";
import Logo from "../../assets/images/Logo.jpg";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.main}>
            <img
              src={Logo}
              alt="Ease Shope Logo"
              className={styles.footer_logo}
            />
            <p className={styles.footer_description}>
              Easy Shopee is a online store that makes your shopping easy, as it
              grantee the products and delivery.
            </p>
          </div>
          <div className={styles.links}>
            <h1 className={styles.Link_title}>Links</h1>
            <ul>
              <li>
                <NavLink to={"/"}>
                  <ion-icon name="arrow-forward-outline"></ion-icon> &nbsp; Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/cart"}>
                  <ion-icon name="arrow-forward-outline"></ion-icon> &nbsp; Cart
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.newsLetter}>
            <img
              src={Logo}
              alt="Easy Shopee Logo"
              className={styles.newsletter_Img}
            />
            <p className={styles.newsletter_description}>
              subscribe with your email to get daily news about latest awesome
              products updates.
            </p>
            <form className={styles.newsletter_form}>
              <input
                type="email"
                className={styles.newsletter_email}
                placeholder="johnWick@example.com"
              />
              <button className={styles.subscribe_btn}>Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
};
