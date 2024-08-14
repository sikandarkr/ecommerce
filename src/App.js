import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

const Header = React.lazy(() => import("./Component/Common/Header/Header"));
const Dashboard = React.lazy(() => import("./Component/Pages/Dashboard"));
const CartSummaryList = React.lazy(() => import("./Component/Pages/CartSummaryList"));
const AddProduct = React.lazy(() => import("./Component/Pages/Admin/AddProduct"));
const AddStore = React.lazy(() => import("./Component/Pages/Admin/AddStore"));
const AdminDashboard = React.lazy(() => import("./Component/Pages/Admin/AdminDashboard"));
const OrderList = React.lazy(() => import("./Component/Pages/Admin/OrderList"));

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </React.Suspense>
          }
        />
        <Route
          path="cartSummary"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <CartSummaryList />
            </React.Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <AdminDashboard />
            </React.Suspense>
          }
        />
        <Route
          path="/admin/addStore"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <AddStore />
            </React.Suspense>
          }
        />
        <Route
          path="/admin/addProduct"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <AddProduct />
            </React.Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <OrderList />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
