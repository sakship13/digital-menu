import React, { useState, useEffect } from "react";
import ShowMenu from "./ShowMenu";
import Footer from "./Footer";
import ChefNav from "./ChefNav";
import ExploreMenu from "./ExploreMenu";
import PlaceOrder from "./PlaceOrder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Cart";
function VeiwMenu() {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  useEffect(() => {
    // Fetch products from the server
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3307/api/Category");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="veiwmenu-wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ChefNav></ChefNav>
              <div className="container-explore">
                <div className="explore-menu-items">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ExploreMenu
                        key={product.id}
                        category={category}
                        setCategory={setCategory}
                        product={product}
                      />
                      
                    ))
                    
                  ) : (
                    <p>No products available</p>
                  )}
                </div>
                <hr/>
              </div>
              <ShowMenu category={category}></ShowMenu>
            </>
          }
        />
        <Route
          path="/cart/*"
          element={
            <>
              <ChefNav />
             
              <Cart />
              
            </>
          }
        />
        
      </Routes>
    </div>
  );
}

export default VeiwMenu;
