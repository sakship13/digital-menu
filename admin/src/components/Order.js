import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import parcel from "../admin_assets/parcel_icon.png";

function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order for the bill
  const [isModalOpen, setIsModalOpen] = useState(false);    // Modal state

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://digital-menu-backend-mjz7.onrender.com/api/userOrders");
      // Parse items field from JSON string to array
      const formattedOrders = response.data.data.map((order) => ({
        ...order,
        items: JSON.parse(order.items), // Parse items string to array
      }));
      setOrders(formattedOrders); // Set the formatted orders
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Error fetching orders:", error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        "http://localhost:3307/api/updateStatus",
        {
          orderId,
          odstatus: event.target.value,
        }
      );

      if (response.data.success) {
        await fetchOrders(); // Fetch updated orders
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error("Error updating status:", error);
    }
  };
  const handlePrintBill = (order) => {
    setSelectedOrder(order); // Set selected order for modal
    setIsModalOpen(true);    // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={parcel} alt="" />
            <div>
              <p className="order-item-food">
                {Array.isArray(order.items) ? (
                  order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span>No items in this order.</span> // Fallback if items is not an array
                )}
              </p>
              <p className="order-item-name">
                {order.firstName} {order.lastName}
              </p>
              <p className="order-item-phone">{order.phone}</p>
            </div>
            <p>Items: {Array.isArray(order.items) ? order.items.length : 0}</p>
            <p>₹{order.amount}</p>
            <div className="order-item-action">
              <select
                onChange={(event) => statusHandler(event, order.orderId)}
                value={order.odstatus}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Serving">Out for Serving</option>
                <option value="Served">Served</option>
              </select>
              <button onClick={() => handlePrintBill(order)}>Print Bill</button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Bill Details</h2>
            <p><strong>Customer Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Order Amount:</strong> ₹{selectedOrder.amount}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {selectedOrder.items.map((item, idx) => (
                <li key={idx}>
                  {item.name}  - Quantity: {item.quantity}, Price: ₹{item.price}
                </li>
              ))}
            </ul>
            <button onClick={() => window.print()}>Print Bill</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
