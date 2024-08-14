import React, { useState, useEffect } from "react";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import mockOrders from "./mockOrders"; // Import the mock data
import "./OrderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filterOrderId, setFilterOrderId] = useState("");
  const [filterCustomerName, setFilterCustomerName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editStatus, setEditStatus] = useState(null);

  useEffect(() => {
    // Simulate fetching data by setting mock data
    setOrders(mockOrders);
  }, []);

  const handleEditStatus = (orderId) => {
    setEditStatus(orderId);
  };

  const handleChangeStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setEditStatus(null);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.order_id.includes(filterOrderId) &&
      order.customer_name.toLowerCase().includes(filterCustomerName.toLowerCase()) &&
      order.order_date.includes(filterDate) &&
      order.status.toLowerCase().includes(filterStatus.toLowerCase())
  );

  return (
    <div className="order-list-container">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={filterOrderId}
          onChange={(e) => setFilterOrderId(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={filterCustomerName}
          onChange={(e) => setFilterCustomerName(e.target.value)}
          className="filter-input"
        />
        <input
          type="date"
          placeholder="Search by Date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-input"
        >
          <option value="">Search by Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_name}</td>
              <td>{order.order_date}</td>
              <td>
                {editStatus === order.order_id ? (
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleChangeStatus(order.order_id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td>{order.total}</td>
              <td>
                {editStatus === order.order_id ? (
                  <CheckOutlined
                    className="mark-icon"
                    onClick={() =>
                      handleChangeStatus(order.order_id, order.status)
                    }
                  />
                ) : (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => handleEditStatus(order.order_id)}
                  />
                )}
                <button className="view-details-btn">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
