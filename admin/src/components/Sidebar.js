import React from 'react'
import addIcon from '../admin_assets/add_icon.png';
import orderIcon from '../admin_assets/order_icon.png';
import { NavLink } from 'react-router-dom';
function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
        
            <NavLink to='add' className="sidebar-option">
                <img src={addIcon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='list' className="sidebar-option">
                <img src={orderIcon} alt="" />
                <p>List Items</p>
            </NavLink>
                
        <NavLink to='orders' className="sidebar-option">
                <img src={orderIcon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to='addcategory' className="sidebar-option">
                <img src={addIcon} alt="" />
                <p>Add Categories</p>
            </NavLink>
            <NavLink to='categories' className="sidebar-option">
                <img src={orderIcon} alt="" />
                <p>List Categories</p>
            </NavLink>
            <NavLink to='addevent' className="sidebar-option">
                <img src={addIcon} alt="" />
                <p>Add Events</p>
            </NavLink>
            <NavLink to='events' className="sidebar-option">
                <img src={orderIcon} alt="" />
                <p>List Events</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
