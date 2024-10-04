import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import HomeLayout from "./components/HomeLayout/HomeLayout";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Add from "./pages/Admin/Add/Add";
import List from "./pages/Admin/List/List";
import Orders from "./pages/Admin/Orders/Orders";
import Categories from "./pages/Admin/Categories/Categories";
import Payment from "./pages/Payment/Payment";
import Confirm from "./pages/Confirm/Confirm";
import MyOrders from "./pages/MyOrders/MyOrders";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<HomeLayout setShowLogin={setShowLogin} />}>
          <Route index element={<Home />} />
          <Route path="/confirm/:token" element={<Confirm />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
