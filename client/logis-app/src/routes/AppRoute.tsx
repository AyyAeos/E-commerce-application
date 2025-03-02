import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import PageNotFound from "../routes/PageNotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProductList from "@/components/ProductList/ProductList";
import AdminPage from "@/pages/AdminPage";
import Inventory from "@/components/Inventory/Inventory";
import Transaction from "@/components/Transaction/Transaction";
import Product from "@/components/ProductList/Product";
import Cart from "@/components/CartBar/Cart";
import CartPage from "@/components/CartBar/CartPage";

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

      {/* Invalid Path */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
