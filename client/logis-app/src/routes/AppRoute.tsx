import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import PageNotFound from "../routes/PageNotFound";
import Login from "@/pages/Login";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logins" element={<Login />} />

      {/* Invalid Path */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
