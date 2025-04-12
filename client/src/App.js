import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import { CategoryProvider } from "./context/categoryContext";

import Home from "./pages/home/home";
import Test from "./pages/Test/test";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import MasterShop from "./pages/MasterShop/mastershop";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CartPage from "./pages/shoppingCart/shoppingCart";
import PaymentPage from "./pages/payment/payment";
import PaymentResult from "./components/PaymentResult/PaymentResult";
import WithLayout from "./Layouts/WithLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const HomeWithLayout = WithLayout(Home);
const MasterShopWithLayout = WithLayout(MasterShop);
const ProductDetailWithLayout = WithLayout(ProductDetail);
const CartPageWithLayout = WithLayout(CartPage);
const PaymentPageWithLayout = WithLayout(PaymentPage);

function App() {
  return (
    <CartProvider>
      <CategoryProvider>
      <Routes>
        <Route path="/" element={<HomeWithLayout />} />
        <Route path="/test" element={<Test />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="mastershop" element={<MasterShopWithLayout />} />
        <Route path="productdetail/:slug" element={<ProductDetailWithLayout />} />
        <Route path="cart" element={<CartPageWithLayout />} />
        <Route path="payment" element={<PaymentPageWithLayout />} />
        <Route path="/payment-success" element={<PaymentResult />} />
        <Route path="*" element={<PageNotFound/>}/>
        {/* <Route path="/payment-failure" element={<PaymentResult />} /> */}
      </Routes>
      </CategoryProvider>
    </CartProvider>
  );
}

export default App;
