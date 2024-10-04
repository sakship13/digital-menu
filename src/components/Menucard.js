import React, { useContext } from 'react';
import './Allpage.css';

import add_icon_white from '../frontend_assets/add_icon_white.png'
import add_icon_green from '../frontend_assets/add_icon_green.png'
import add_icon_red from '../frontend_assets/remove_icon_red.png'
import { StoreContext } from './StoreContext';

function Menucard({ product }) {
   

const { cartItems,addToCart,removeFromCart}=useContext(StoreContext);

  return (
    <>
    <div className="food-item-container">
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={'https://digital-menu-backend-mjz7.onrender.com'+"/uploads/"+ product.image} alt="" className="food-item-image" />
        {!cartItems[product.id] ? <img className='add' onClick={()=>addToCart(product.id)} src={add_icon_white} alt="Add Icon (white)"/> 
          : <div className="food-item-Counter">
            <img onClick={()=>removeFromCart(product.id)} src={add_icon_red} alt="remove icon"/> 
            <p>{cartItems[product.id]}</p>
            <img  onClick={()=>addToCart(product.id)} src={add_icon_green} alt="Add Icon (green)"/> 
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name">
          <p>{product.name}</p>
        </div>
        <p className="food-item-desc">{product.description}</p>
        <p className='food-item-price'>₹{product.price}</p>
      </div>
    </div>
    </div>
    </>
  );
}
export default Menucard;
