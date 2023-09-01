import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductAPI } from "../apis/ProductAPI";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [cateLoading, setCateLoading] = useState(false);

  const fetchProducts = async (category) => {
    setLoading(true);

    let phrase = "";
    if (selectedCategory !== "") {
      phrase = "category/" + category;
    }

    try {
      const res = await ProductAPI.get("/" + phrase);
      setProducts(res.data || []);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const fetchCategory = async () => {
    setCateLoading(true);

    try {
      const res = await ProductAPI.get("/categories");
      setCategory(res.data || []);
    } catch (e) {
      console.log(e);
    }

    setCateLoading(false);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <ProductContext.Provider
      value={{
        products,
        category,
        loading,
        cateLoading,
        setSelectedCategory,
        setSearch,
        search,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductContextProvider.propTypes = {
  children: PropTypes.node,
};
