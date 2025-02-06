import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import Test from './pages/Test/test';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='test' element={<Test />}></Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='register' element={<Register />}></Route>
    </Routes>
  );
}

export default App;
