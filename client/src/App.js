import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cartContext";

import Home from "./pages/home/home";
import Test from "./pages/Test/test";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import MasterShop from "./pages/MasterShop/mastershop";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CartPage from "./pages/shoppingCart/shoppingCart";
import PaymentPage from "./pages/payment/payment";

import WithLayout from "./Layouts/WithLayout";


const HomeWithLayout = WithLayout(Home);

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomeWithLayout />} />
        <Route path="/test" element={<Test />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="mastershop" element={<MasterShop />} />
        <Route path="productdetail/:slug" element={<ProductDetail />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="payment" element={<PaymentPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
