
import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import Test from './pages/Test/test';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import MasterShop from './pages/MasterShop/mastershop';
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import WithLayout from "./Layouts/WithLayout";

const HomeWithLayout = WithLayout(Home);


function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeWithLayout />} />
      <Route path='test' element={<Test />}></Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='register' element={<Register />}></Route>
      <Route path='mastershop' element={<MasterShop />}></Route>
      <Route path='productdetail' element={<ProductDetail />}></Route>
    </Routes>
  );
}

export default App;
