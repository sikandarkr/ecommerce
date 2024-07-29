import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
const ListPage = React.lazy(() => import("./Component/ListPage/ListPage"));
const ListDetails = React.lazy(() => import("./Component/ListDetails/ListDetails"));
const Header =React.lazy(() => import("./Component/Common/Header/Header"));
const  Dashboard = React.lazy(() => import("./Component/Pages/Dashboard"));
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
        {/* <Route
          path="details"
          element={
            <React.Suspense fallback={<>...</>}>
              <ListPage />
            </React.Suspense>
          }
        /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
