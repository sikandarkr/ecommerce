import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
const Header =React.lazy(() => import("./Component/Common/Header/Header"));
// const  HorizontalScroll  =React.lazy(() => import("./Component/Common/HorizontalScroll/HorizontalScroll"));
const  Dashboard = React.lazy(() => import("./Component/Pages/Dashboard"));
const  CartSummaryList = React.lazy(() => import("./Component/Pages/CartSummaryList"));
const Shop = React.lazy(()=>import("./Component/Pages/Shop")); 
function App() {
  return (
    <BrowserRouter>
    <Header/>
    
      <Routes>
        {/* <Route index element={<ListPage />} /> */}
        <Route
          path=""
          element={
            <React.Suspense fallback={<>...</>}>
              <Dashboard />
            </React.Suspense>
          }
        />
        <Route
          path="cartSummary"
          element={
            <React.Suspense fallback={<>...</>}>
              <CartSummaryList />
            </React.Suspense>
          }
        />
         <Route
          path="filtered/product&shop"
          element={
            <React.Suspense fallback={<>...</>}>
              <Shop />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
