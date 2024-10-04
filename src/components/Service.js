import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Service() {
  const navigate = useNavigate()
  function goToMenu(){
    
    navigate('/viewmenu', { replace: true });
  }
  return (
    <div>
        <section className="section service bg-black-10 text-center" aria-label="service">
        <div className="container">

          <p className="section-subtitle label-2">Flavors For Royalty</p>

          <h2 className="headline-1 section-title">We Offer Top Notch</h2>

          <p className="section-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industrys
            standard dummy text ever.
          </p>

          <ul className="grid-list">

            <li>
              <div className="service-card">

                <a href="#" className="has-before hover:shine">
                  <figure className="card-banner img-holder" style={{ "--width": "285px", "--height": "336px" }}>
                    <img src={`${process.env.PUBLIC_URL}/images/service-1.jpg`} width="285" height="336" loading="lazy" alt="Breakfast"
                      className="img-cover"/>
                  </figure>
                </a>

                <div className="card-content">

                  <h3 className="title-4 card-title">
                    <a href="#">Breakfast</a>
                  </h3>

                  <Link to="/viewmenu" onClick={goToMenu} className="btn-text hover-underline label-2">View Menu</Link>

                </div>

              </div>
            </li>

            <li>
              <div className="service-card">

                <a href="#" className="has-before hover:shine">
                  <figure className="card-banner img-holder" style={{ "--width": "285px", "--height": "336px" }}>
                    <img src={`${process.env.PUBLIC_URL}/images/service-2.jpg`} width="285" height="336" loading="lazy" alt="Appetizers"
                      className="img-cover"/>
                  </figure>
                </a>

                <div className="card-content">

                  <h3 className="title-4 card-title">
                    <a href="#">Appetizers</a>
                  </h3>

                  <Link to="/viewmenu" onClick={goToMenu} className="btn-text hover-underline label-2">View Menu</Link>

                </div>

              </div>
            </li>

            <li>
              <div className="service-card">

                <a href="#" className="has-before hover:shine">
                  <figure className="card-banner img-holder" style={{ "--width": "285px", "--height": "336px" }}>
                    <img src={`${process.env.PUBLIC_URL}/images/service-3.jpg`} width="285" height="336" loading="lazy" alt="Drinks"
                      className="img-cover"/>
                  </figure>
                </a>

                <div className="card-content">

                  <h3 className="title-4 card-title">
                    <a href="#">Drinks</a>
                  </h3>

                  <Link to="/viewmenu" onClick={goToMenu} className="btn-text hover-underline label-2">View Menu</Link>

                </div>

              </div>
            </li>

          </ul>

          <img src={`${process.env.PUBLIC_URL}/images/shape-1.png`} width="246" height="412" loading="lazy" alt="shape"
            className="shape shape-1 move-anim"/>
          <img src={`${process.env.PUBLIC_URL}/images/shape-2.png`} width="343" height="345" loading="lazy" alt="shape"
            className="shape shape-2 move-anim"/>

        </div>
      </section>



      
    </div>
  )
}

export default Service
