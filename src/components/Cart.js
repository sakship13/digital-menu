import React, { useContext,useEffect,useState } from 'react'
import {StoreContext} from './StoreContext'
import { Link, useNavigate } from 'react-router-dom';
function Cart() {
    const {cartItems,removeFromCart,list,getTotalCartAmount}=useContext(StoreContext);
  const navigate=useNavigate();
  function goToCheckout(){
    const totalAmount = getTotalCartAmount();
    console.log('Total Cart Amount:', totalAmount); // Debugging log to verify the total amount
  
    if (totalAmount > 0) {
      navigate('/order', { replace: true });
    } else {
      alert('Your cart is empty! Please add items before proceeding to checkout.');
    }
    
  }
 
  return (
    <div className='cart'>
        <div className="cart-items">
            <div className="cart-items-title">
                <p >Items</p>
                <p >Title</p>
                <p >Price</p>
                <p >Quantity</p>
                <p >Total</p>
                <p >Remove</p>
                </div>
                 <br/>
                 <hr className='hr'/>
                { list.map((item,index) => {
                  if(cartItems[item.id]>0){
                    return(
                      <div key={item.id}>
                      <div className="cart-items-title cart-items-item ">
                            <img src={'http://localhost:3307'+"/uploads/"+item.image} alt=''></img>
                             <p>{item.name}</p>
                             <p>₹{item.price}</p>
                             <p>{cartItems[item.id]}</p>
                             <p>₹{item.price*cartItems[item.id]}</p>
                             <p onClick={()=>removeFromCart(item.id)} className='cross'>X</p>
                      </div>
                      <hr className='hr'/>
                      </div>
                    )
                  }
                 })}
            
        </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
            <p>GST</p>
            <p>₹{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            
            </div>

          </div>
    <Link to='#' onClick={(e) => {e.preventDefault(); goToCheckout();}} className="btn btn-secondary">
        <span className="text text-1">PROCEED TO CHECKOUT</span>

        <span className="text text-2" aria-hidden="true">PROCEED TO CHECKOUT</span>
      </Link>
        
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code,Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
