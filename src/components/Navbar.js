import React from 'react'
import { useState ,useEffect} from 'react';


function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [headerActive, setHeaderActive] = useState(false);
  const [backTopBtnActive, setBackTopBtnActive] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
    const navbar = document.querySelector("[data-navbar]");
    const overlay = document.querySelector("[data-overlay]");
    
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Handle hiding/showing the header and topbar based on scroll direction
      if (currentScrollPos > lastScrollPos) {
        setHeaderHidden(true);
        
      } else {
        setHeaderHidden(false);
        
      }

      setLastScrollPos(currentScrollPos);

      // Check if scroll position is greater than or equal to 50
      if (currentScrollPos >= 50) {
        setHeaderActive(true);
        setBackTopBtnActive(true);
      } else {
        setHeaderActive(false);
        setBackTopBtnActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event listener on component unmount
    };
  }, [lastScrollPos]);
    
  return (
    <>
      
         
  
  <header className={`header ${headerActive ? 'active' : ''} ${headerHidden ? 'hide' : ''}`} data-header>
    <div className="container">

      <a href="#logo" className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/Logo.png`} width="160" height="50" alt="Tanu's - Home"/>
      </a>

      <nav className={`navbar ${isNavOpen ? 'active' : ''}`} data-navbar>

        <button className="close-btn" aria-label="close menu" onClick={toggleNavbar}data-nav-toggler>
          <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
        </button>

        <a href="#logo" className="logo">
          <img  src={`${process.env.PUBLIC_URL}/images/Logo.png`} width="160" height="50" alt="Tanu's - Home"/>
        </a>

        <ul className="navbar-list">

          <li className="navbar-item">
            <a href="#home" className="navbar-link hover-underline active">
              <div className="separator"></div>

              <span className="span">Home</span>
            </a>
          </li>

          <li className="navbar-item">
            <a href="#menu" className="navbar-link hover-underline">
              <div className="separator"></div>

              <span className="span">Menus</span>
            </a>
          </li>

          <li className="navbar-item">
            <a href="#about" className="navbar-link hover-underline">
              <div className="separator"></div>

              <span className="span">About Us</span>
            </a>
          </li>

          <li className="navbar-item">
            <a href="#events" className="navbar-link hover-underline">
              <div className="separator"></div>

              <span className="span">Events</span>
            </a>
          </li>

          <li className="navbar-item">
            <a href="#contact" className="navbar-link hover-underline">
              <div className="separator"></div>

              <span className="span">Contact</span>
            </a>
          </li>

        </ul>

        <div className="text-center">
          <p className="headline-1 navbar-title">Visit Us</p>

          <address className="body-4">
            Restaurant St, Delicious City, <br/>
            London 9578, UK
          </address>

          <p className="body-4 navbar-text">Open: 9.30 am - 2.30pm</p>

          <a href="mailto:booking@grilli.com" className="body-4 sidebar-link">booking@grilli.com</a>

          <div className="separator"></div>

          <p className="contact-label">Booking Request</p>

          <a href="tel:+88123123456" className="body-1 contact-number hover-underline">
            +88-123-123456
          </a>
        </div>

      </nav>

      <a href="#contact" className="btn btn-secondary">
        <span className="text text-1">Find A Table</span>

        <span className="text text-2" aria-hidden="true">Find A Table</span>
      </a>

      <button className="nav-open-btn" aria-label="open menu" data-nav-toggler onClick={toggleNavbar}>
        <span className="line line-1"></span>
        <span className="line line-2"></span>
        <span className="line line-3"></span>
      </button>

      <div className={`overlay ${isNavOpen ? 'active' : ''}`} data-nav-toggler data-overlay></div>

    </div>
  </header>



    </>
  )
}

export default Navbar
