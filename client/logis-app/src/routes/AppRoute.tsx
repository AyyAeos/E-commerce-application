import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/Home";
import PageNotFound from "../routes/PageNotFound";
import Login from "@/components/Login/Login";
import Register from "@/components/Login/Register";
import ProductList from "@/components/ProductList/ProductList";
import AdminPage from "@/components/Admin/AdminPage";
import Product from "@/components/ProductList/Product";
import CartPage from "@/components/CartBar/CartPage";
import Checkout from "@/components/CheckOut/CheckOut";
import CheckOrder from "@/components/Order/Order";
import Chatbots from "@/components/Chatbot/Chatbot";
import LoginErrorMessage from "@/LoginErrorMessage";
import Inventory from "@/components/Admin/Inventory/Inventory";
import axiosInstance from "@/utils/axiosInstance";
import NavBar from "@/components/NavBar/NavBar";
// Your login error message component

const AppRoutes: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const location = useLocation();

  // List of paths that do not require authentication
  const excludePaths = ["/", "/logins", "/register"];

useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/logins/auth/login", { withCredentials: true }); 
      if (response.data && response.data.code === 1) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    } catch (err) {
      setIsUserLoggedIn(false);
    }
  };
  checkAuth();
}, [location.pathname]);


  // Determine if the route requires login
  const requiresLogin = !excludePaths.includes(location.pathname) && !isUserLoggedIn;

  return (
    <div>
      <NavBar isLogin={isUserLoggedIn} setIsLogin={setIsUserLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logins" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admins" element={requiresLogin ? <LoginErrorMessage /> : <AdminPage />} />
        <Route path="/products" element={requiresLogin ? <LoginErrorMessage /> : <ProductList />} />
        <Route path="/logins/admin" element={<AdminPage />} />
        <Route path="/admins/inventory" element={requiresLogin ? <LoginErrorMessage /> : <Inventory />} />
        <Route path="/products/:itemId" element={requiresLogin ? <LoginErrorMessage /> : <Product />} />
        <Route path="/carts" element={requiresLogin ? <LoginErrorMessage /> : <CartPage />} />
        <Route path="/checkouts" element={requiresLogin ? <LoginErrorMessage /> : <Checkout />} />
        <Route path="/orders" element={requiresLogin ? <LoginErrorMessage /> : <CheckOrder />} />
        <Route path="/chatbots" element={requiresLogin ? <LoginErrorMessage /> : <Chatbots />} />

        {/* Catch-all for invalid paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
