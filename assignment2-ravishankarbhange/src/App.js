import React from "react";
import "./App.css";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wishlist from "./components/Wishlist.js";
import Cart from "./components/Cart.js";
import ViewProduct from "./components/ViewProduct.js";
import CartProvider from "./components/CartContext.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js"; 
import MyProfile from "./components/MyProfile.js";

const MainLayout = ({ children }) => (
  <>
    <Header />
    <div>{children}</div>
  </>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={ <MainLayout> <Body /> </MainLayout> }/>
            <Route path="/wishlist" element={ <MainLayout> <Wishlist /> </MainLayout> }/>
            <Route path="/myprofile" element={ <MainLayout> <MyProfile /> </MainLayout> }/>
            <Route path="/cart" element={ <MainLayout> <Cart /> </MainLayout>}/>
            <Route path="/viewProduct/:id" element={ <MainLayout> <ViewProduct /> </MainLayout> }/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
