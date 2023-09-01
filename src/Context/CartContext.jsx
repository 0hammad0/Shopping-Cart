import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductAPI } from "../apis/ProductAPI";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("shoppingCart")) || []
  );

  const [oneProduct, setOneProduct] = useState(null);

  const AddToCart = (id) => {
    const item = products.find((item) => item.id === id);
    let itemWithQuantity = { ...item, quantity: 1 };

    const existingCartItem = cart.find(
      (cart) => cart.id === itemWithQuantity.id
    );

    if (existingCartItem) {
      itemWithQuantity = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };

      const updatedCart = cart.map((cartItem) =>
        cartItem.id === itemWithQuantity.id ? itemWithQuantity : cartItem
      );
      setCart(updatedCart);
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
    } else {
      setCart([...cart, itemWithQuantity]);
      localStorage.setItem(
        "shoppingCart",
        JSON.stringify([...cart, itemWithQuantity])
      );
    }
  };

  const AddToCartOne = (id, quantity) => {
    const item = products.find((item) => item.id === id);
    let itemWithQuantity = { ...item, quantity: quantity };

    const existingCartItem = cart.find(
      (cart) => cart.id === itemWithQuantity.id
    );

    if (existingCartItem) {
      itemWithQuantity = {
        ...existingCartItem,
        quantity: quantity,
      };

      const updatedCart = cart.map((cartItem) =>
        cartItem.id === itemWithQuantity.id ? itemWithQuantity : cartItem
      );
      setCart(updatedCart);
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
    } else {
      setCart([...cart, itemWithQuantity]);
      localStorage.setItem(
        "shoppingCart",
        JSON.stringify([...cart, itemWithQuantity])
      );
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await ProductAPI.get("/");
      setProducts(res.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  const getOneProduct = async () => {
    if (productId == null) return;

    const OneInCart = cart.find((item) => item.id == productId);

    if (OneInCart && productId !== null) {
      setOneProduct(OneInCart);
    } else {
      try {
        const res = await ProductAPI.get("/");
        const One = res.data.find((item) => item.id == productId);

        let itemWithQuantity = { ...One, quantity: 1 };
        setOneProduct(itemWithQuantity);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const removeFromCart = (id) => {
    const UpdatedCart = cart.filter((cart) => cart.id !== id);
    setCart(UpdatedCart);
    localStorage.setItem("shoppingCart", JSON.stringify(UpdatedCart));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    getOneProduct();
  }, [productId, cart]);

  return (
    <CartContext.Provider
      value={{
        AddToCart,
        cart,
        getOneProduct,
        oneProduct,
        setProductId,
        AddToCartOne,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node,
};
