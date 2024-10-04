import React from 'react'
import { useState,useEffect } from 'react'
import Menucard from './Menucard';
function ShowMenu({category}) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch products from the server
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3307/api/Menus');
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
  
      fetchProducts();
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div className="food-display">
      <div className="food-display-list">
      {products.length > 0 ? (
                    products.map((product) => {
                        if (category === "All" || category === product.category) {
                            return <Menucard key={product.id} product={product} />;
                        }
                        return null; // If the condition is not met, return null
                    })
                ) : (
                    <p>No products available</p>
                )}
      </div>
    </div>
  )
}

export default ShowMenu
