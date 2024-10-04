import React, { useContext,  useState } from 'react';
import { StoreContext } from './StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PlaceOrder() {
  const { getTotalCartAmount, cartItems = [], setOrderDetails,list ,clearCart } = useContext(StoreContext);
  const [orderID, setOrderID] = useState(null);
  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const totalAmount = getTotalCartAmount();
      let orderItems = [];
      list.map((item)=>{
        if(cartItems[item.id]>0){
          let itemInfo = { ...item };
          itemInfo["quantity"]=cartItems[item.id];
          orderItems.push(itemInfo)
        }
      })
      // Ensure cartItems are populated and have quantity
     

      // Log items to debug
      console.log("Items being sent:", orderItems);

      let data={
        details:orderData,
        items:orderItems,
        amount:getTotalCartAmount()+2,
      }
      // Send order data to the backend
      const response = await axios.post('https://digital-menu-backend-mjz7.onrender.com/api/placeOrder', data);

      if (response.data.success) {
        console.log("Order placed successfully");
        setOrderID(response.data.orderID); // Set the order ID to display it to the user
        setOrderDetails({
          orderID: response.data.orderID, // Ensure correct orderID
          items: orderItems,
          totalAmount
        });
        clearCart();
        navigate('/myorder');
      }
    } catch (error) {
      console.error('Error placing the order', error);
    }
  };

  return (
    <div>
      <form className="place-order" onSubmit={handleSubmit}>
        <div className='place-order-left'>
          <p className="title">Order Information</p>
          <div className="multi-fields">
            <input
              type="text"
              placeholder='First Name'
              name="firstName"
              value={orderData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder='Last Name'
              name="lastName"
              value={orderData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <input
            type="number"
            placeholder='Phone'
            name="phone"
            value={orderData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>GST</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <Link to='#' onClick={ handleSubmit} className="btn btn-secondary">
              <span className="text text-1">PLACE THE ORDER</span>
              <span className="text text-2" aria-hidden="true">PLACE THE ORDER</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;

