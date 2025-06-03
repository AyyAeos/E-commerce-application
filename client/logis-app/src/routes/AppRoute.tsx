import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";

import PageNotFound from "../routes/PageNotFound";
import Login from "@/components/Login/Login";
import Register from "@/components/Login/Register";
import ProductList from "@/components/ProductList/ProductList";
import AdminPage from "@/components/Admin/AdminPage";
import Inventory from "@/components/Inventory/Inventory";
import Transaction from "@/components/Transaction/Transaction";
import Product from "@/components/ProductList/Product";
import Cart from "@/components/CartBar/CartIcon";
import CartPage from "@/components/CartBar/CartPage";
import Checkout from "@/components/CheckOut/CheckOut";
import OrderPage from "@/components/Order/Order";
import CheckOrder from "@/components/Order/Order";
import AdminOrder from "@/components/Admin/AdminOrder";
import UserTable from "@/components/User/User";
import Chatbots from "@/components/Chatbot/Chatbot";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logins" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admins" element={<AdminPage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/logins/admin" element={<AdminPage />} />
      <Route path="/admins/inventory" element={<Inventory />} />
      <Route path="/admins/user" element={<UserTable />} />
      <Route path="/products/:itemId" element={<Product />} />
      <Route path="/carts/:userId" element={<CartPage />} />
      <Route path="/checkouts/:userId" element={<Checkout />} />
      <Route path="/orders/:userId" element={<CheckOrder />} />
      <Route path="/chatbots" element={<Chatbots />} />

      {/* Invalid Path */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
