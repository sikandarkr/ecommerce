import React, { useState } from "react";
import { Input, Button, Table, Form, Image, Typography, InputNumber, message } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import "./OrderList.css";

const { Title } = Typography;

const UpdatePrice = () => {
  const [storeID, setStoreID] = useState("");
  const [storeName, setStoreName] = useState("");
  const [productList, setProductList] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchProducts = async () => {
    if (!storeID || !storeName) {
      message.warning("Please enter both Store ID and Store Name.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://qualitytechlab.com/rest-api/getproductsbystoreId.php",
        { store_id: storeID },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      let products = response.data;
      // Ensure products is an array
      if (!Array.isArray(products)) {
        products = [];
      }

      setProductList(products.records);
      message.success("Products fetched successfully!");
    } catch (error) {
      console.error("Error in fetching products:", error.response ? error.response.data : error.message);
      message.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const isEditing = (record) => record.product_id === editingKey;

  const handleEdit = (record) => {
    setEditingKey(record.product_id);
  };

  const handleSave = (product_id) => {
    // Here you can handle the API call to save the updated prices
    message.success("Price updated successfully!");
    setEditingKey("");
  };

  const columns = [
    {
      title: "Product Image",
      dataIndex: "product_image",
      key: "product_image",
      render: (text) => <Image width={50} src={text} />,
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Product Type",
      dataIndex: "product_type",
      key: "product_type",
      filters: [
        { text: 'Utilities', value: 'utilities' },
        { text: 'Electronics', value: 'electronic' },
        { text: 'Food', value: 'food' },
      ],
      onFilter: (value, record) => record.product_type.includes(value),
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
      render: (_, record) => {
        return isEditing(record) ? (
          <InputNumber
            min={0}
            defaultValue={record.product_price}
            onChange={(value) => (record.product_price = value)}
          />
        ) : (
          record.product_price
        );
      },
    },
    {
      title: "Discounted Price",
      dataIndex: "product_discounted_price",
      key: "product_discounted_price",
      render: (_, record) => {
        return isEditing(record) ? (
          <InputNumber
            min={0}
            defaultValue={record.product_discounted_price}
            onChange={(value) => (record.product_discounted_price = value)}
          />
        ) : (
          record.product_discounted_price
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <CheckOutlined
            onClick={() => handleSave(record.product_id)}
            style={{ color: "green", cursor: "pointer" }}
          />
        ) : (
          <EditOutlined
            onClick={() => handleEdit(record)}
            style={{ color: "blue", cursor: "pointer" }}
          />
        );
      },
    },
  ];

  return (
    <div className="update-price-container">
      <Title level={2}>Update Product Prices</Title>
      <Form layout="inline" className="fetch-form">
        <Form.Item label="Store ID">
          <Input
            value={storeID}
            onChange={(e) => setStoreID(e.target.value)}
            placeholder="Enter Store ID"
          />
        </Form.Item>
        <Form.Item label="Store Name">
          <Input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter Store Name"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleFetchProducts} loading={loading}>
            Fetch Products
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={productList}
        rowKey="product_id"
        className="product-table"
        pagination={false}
      />
    </div>
  );
};

export default UpdatePrice;
