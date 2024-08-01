import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Admin from "./Component/Pages/Admin";
const Header = React.lazy(() => import("./Component/Common/Header/Header"));
const Dashboard = React.lazy(() => import("./Component/Pages/Dashboard"));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route
          path=""
          element={
            <React.Suspense fallback={<>...</>}>
              <Dashboard />
            </React.Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <React.Suspense fallback={<>...</>}>
              <Admin />
            </React.Suspense>
          }
        />
        />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
