import { set } from "mongoose";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider =(props)=>{
  const [cartItems,setCartItems]=useState({});
  const [list,setList]=useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3307/api/Menus');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched product data:', data); // Log fetched data
        setList(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const clearCart = () => {
    setCartItems({}); // Reset cart items
  };

  const addToCart = (itemId) => {
    const idAsString = String(itemId); // Convert itemId to string
    setCartItems((prev) => ({
      ...prev,
      [idAsString]: (prev[idAsString] || 0) + 1, // Increment or initialize to 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newQuantity = (prev[itemId] || 1) - 1; // Ensure it doesn't go below 0
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev; // Remove item from cart
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = list.find((product) => product.id === parseInt(itemId)); // Ensure type consistency
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        } else {
          console.error(`Item not found in list: ${itemId}`);
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartQuantity = () => {
    let totalQuantity = 0;
    for (const item in cartItems) {
      totalQuantity += cartItems[item];
    }
    return totalQuantity;
  };

    const contextValue={
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      list,
      setList,
      getTotalCartAmount,
      getTotalCartQuantity,
      orderDetails,
      setOrderDetails,
      clearCart
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
