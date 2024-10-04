import React, { useEffect } from 'react';
import $ from 'jquery';

function Menubar({ changePage }) {
  const pages = ['Home', 'View Orders', 'Add Events', 'Menu Category', 'Add Menu', 'Review'];

  useEffect(() => {
    // Sidebar menu click functionality using jQuery
    $('.sidebar-container-admin .navbar-item-admin > button').click(function () {
      // Remove 'active' class from all menu items
      $('.navbar-item-admin > button').removeClass('active');
      // Add 'active' class to the clicked item
      $(this).addClass('active');
    });
  }, []);
  return (
  
    <header className="header-admin">
    <div className="sidebar-container-admin ">
      <a href="#logo" className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/Logo.png`} width="160" height="50" alt="Tanu's - Home" />
      </a>
      <nav className="navbar-admin">
        <ul className="navbar-list-admin">
          {pages.map((page, index) => (
            <li key={index} className="navbar-item-admin">
              <button className="navbar-link" onClick={() => changePage(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className="navbar-item-admin">
            <a className="navbar-link-admin sign-out" href="http://localhost:3000/">
              Sign Out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  );
}

export default Menubar;