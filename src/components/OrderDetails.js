import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parcel from '../admin_assets/parcel_icon.png';

function OrderDetails() {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3307/api/userOrders');
      // Parse the items string back into an array
      const formattedOrders = response.data.data.map(order => ({
        ...order,
        items: JSON.parse(order.items), // Parse items string to array
      }));
      setData(formattedOrders); // Set the formatted orders
      console.log(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className='container-od'>
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={parcel} alt="" />
              <p>
                {Array.isArray(order.items) ? (
                  order.items.map((item, itemIndex) => (
                    <span key={itemIndex}>
                      {item.name} X {item.quantity}
                      {itemIndex < order.items.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>No items in this order.</span> // Fallback if items is not an array
                )}
              </p>
              <p>₹ {order.amount}</p>
              <p>Items: {Array.isArray(order.items) ? order.items.length : 0}</p>
              <p className='stat'>
                <span>&#x25cf;</span><b>{order.odstatus}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderDetails;


