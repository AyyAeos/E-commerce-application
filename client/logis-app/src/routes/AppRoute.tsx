import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Login/Home";

import PageNotFound from "../routes/PageNotFound";
import Login from "@/components/Login/Login";
import Register from "@/components/Login/Register";
import ProductList from "@/components/ProductList/ProductList";
import AdminPage from "@/components/Admin/AdminPage";
import Inventory from "@/components/Inventory/Inventory";
import Transaction from "@/components/Transaction/Transaction";
import Product from "@/components/ProductList/Product";
import Cart from "@/components/CartBar/Cart";
import CartPage from "@/components/CartBar/CartPage";
import Checkout from "@/components/CheckOut/CheckOut";
import OrderPage from "@/components/Order/Order";

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
      <Route path="/admins/transaction" element={<Transaction />} />
      <Route path="/products/:itemId" element={<Product />} />
      <Route path="/carts/:userId" element={<CartPage />} />
      <Route path="/checkouts/:userId" element={<Checkout />} />
      <Route path="/orders/:userId" element={<OrderPage />} />

      {/* Invalid Path */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
