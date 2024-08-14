import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import "../../css/admin.css"; // Ensure you have the corresponding CSS file for styling
import AddStore from "./AddStore";
import AddProduct from "./AddProduct";
import UpdatePrice from "./UpdatePrice";
import OrderList from "./OrderList";

const AdminDashboard = () => {
  const [storeList, setStoreList] = useState();
  useEffect(() => {
    fetchStoreList();
  }, []);

  const fetchStoreList = async () => {
    const res = await fetch(
      "https://qualitytechlab.com/rest-api/liststore.php"
    );
    const data = await res.json();
    console.log(data?.records);
    setStoreList(data?.records);
  };
  const items = [
    {
      key: "1",
      label: "Add Store",
      children: <AddStore />,
    },
    {
      key: "2",
      label: "Add Product",
      children: <AddProduct storeList={storeList} />,
    },
    {
        key: "3",
        label: "Orders",
        children: <OrderList storeList={storeList} />,
    },
    {
        key: "4",
        label: "Update Price",
        children: <UpdatePrice storeList={storeList} />,
    },

   
  ];

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin</h1>
        <div className="header-decoration"></div>
      </header>
      <Tabs defaultActiveKey="1" items={items} animated />
    </div>
  );
};

export default AdminDashboard;
