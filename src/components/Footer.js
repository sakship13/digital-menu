import React from 'react';
import facebook from '../frontend_assets/facebook_icon.png'
import twitter from '../frontend_assets/twitter_icon.png'
import linkedin from '../frontend_assets/linkedin_icon.png'
function Footer() {
  return (
    <footer className=" footer footer1">
       <div className="footer-brand has-before has-after footer-content">
      <div className="footer-content">
     
        <div className="footer-content-left">
          
            <a href="#" className="logo">
              <img
                src={`${process.env.PUBLIC_URL}/images/Logo.png`}
                width="300"
                height="50"
               alt="grilli home"
              />
            </a>
             <p className='info'> Tanu's Kitchen offers a delightful blend of traditional and modern culinary experiences.Located in the heart of Delicious City, it’s the perfect spot for food lovers seeking a unique dining experience.
            </p>
            <div className='footer-social-icons'>
              <img src={facebook} alt="" />
              <img src={twitter} alt="" />
              <img src={linkedin} alt="" />
            </div>
          </div>

            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                Menus
              </a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                Our Chefs
              </a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                Contact
              </a>
            </li>

          </ul>
          
            </div>
    <div className="footer-content-right">
      <h2>GET IN TOUCH</h2>

            <div className="wrapper">
              <div className="separator"></div>
              <div className="separator"></div>
              <div className="separator"></div>
            </div>

            <p className="title-1">Get News & Offers</p>

            <p className="label-1">
              Subscribe us & Get <span className="span">25% Off.</span>
            </p>
           
            <form action="" className="input-wrapper">
              <div className="icon-wrapper">
                <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                <input
                  type="email"
                  name="email_address"
                  placeholder="Your email"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <button type="submit" className="btn btn-secondary">
                <span className="text text-1">Subscribe</span>
                <span className="text text-2" aria-hidden="true">
                  Subscribe
                  </span>
              </button>
            
              </form>
              
              </div>

              </div>
      </div>
    </footer>
  );
}

export default Footer;
