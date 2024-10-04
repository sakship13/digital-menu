import React from 'react'
import logo from '../admin_assets/logo1.png'
import profile from '../admin_assets/profile_image.png'
import logout from '../admin_assets/logout_icon.png'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate=useNavigate();
  const onlogout = ()=>{
    alert("Do you want to log out?");
    navigate("/");
  }
  return (
    <div className='navbar'>
       <div className="nav-logo">
        <img className='logo'src={logo} alt="logo" />
        </div>
        <div className="profile-sec">
        <img onClick={onlogout} className='log-out' src={logout} alt='log-out'/>
        <p>LogOut</p>
        <img  className='profile' src={profile} alt="profile" />
        </div>
    </div>
  )
}

export default Navbar
