import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Layouts/Header/Header";
import { Footer } from "./Layouts/Footer/Footer";
import { Home } from "./Pages/Home/Home";
import { Cart } from "./Pages/Cart/Cart";
import { Sidebar } from "./Components/SideBar/Sidebar";
import { ProductDetail } from "./Pages/ProductDetail/ProductDetail";

import { ProductContextProvider } from "./Context/ProductContext";
import { CartContextProvider } from "./Context/CartContext";

function App() {
  const [slider, setSlider] = useState(false);

  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Header slider={slider} setSlider={setSlider} />
        <Sidebar slider={slider} setSlider={setSlider} />

        <Routes>
          <Route path="*" element={<Home />} />

          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/product-detail/:productId"
            element={<ProductDetail />}
          />
        </Routes>

        <Footer />
      </CartContextProvider>
    </ProductContextProvider>
  );
}

export default App;
