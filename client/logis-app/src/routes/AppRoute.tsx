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
// Your login error message component

const AppRoutes: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const location = useLocation();

  // List of paths that do not require authentication
  const excludePaths = ["/", "/logins", "/register"];

  useEffect(() => {
    // Check if the user is logged in by looking for userId in localStorage
    const userId = localStorage.getItem("userId"); // or token or whatever you're storing
    if (userId) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [location.pathname]);

  // Determine if the route requires login
  const requiresLogin = !excludePaths.includes(location.pathname) && !isUserLoggedIn;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logins" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admins" element={requiresLogin ? <LoginErrorMessage /> : <AdminPage />} />
        <Route path="/products" element={requiresLogin ? <LoginErrorMessage /> : <ProductList />} />
        <Route path="/logins/admin" element={<AdminPage />} />
        <Route path="/admins/inventory" element={requiresLogin ? <LoginErrorMessage /> : <Inventory />} />
        <Route path="/products/:itemId" element={requiresLogin ? <LoginErrorMessage /> : <Product />} />
        <Route path="/carts/:userId" element={requiresLogin ? <LoginErrorMessage /> : <CartPage />} />
        <Route path="/checkouts/:userId" element={requiresLogin ? <LoginErrorMessage /> : <Checkout />} />
        <Route path="/orders/:userId" element={requiresLogin ? <LoginErrorMessage /> : <CheckOrder />} />
        <Route path="/chatbots" element={requiresLogin ? <LoginErrorMessage /> : <Chatbots />} />

        {/* Catch-all for invalid paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
