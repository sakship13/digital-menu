import React from "react";
import "./ExploreMenu.css";
import { useState, useEffect, useRef } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
function ExploreMenu({ category, setCategory,product }) {
  


  return (
  <>
       <div className="explore-menu-category">
          <div className="category-title navbar-link"onClick={()=>setCategory(Prev=>Prev===product.title?"All":product.title)} >
            <img
              src={'https://digital-menu-backend-mjz7.onrender.com'+"/uploads/"+ product.image}
              width="100"
              height="100"
              loading="lazy"
              alt="Greek Salad"
              className={category===product.title?"active":""}
            />
          
            <a className={category===product.title?"active":""} href="#">{product.title}</a>
            
          </div>
          
          
      </div>
    </>
  );
}

export default ExploreMenu;
