import React, { useEffect, useState } from 'react'
import  axios from 'axios'
import { toast } from 'react-toastify';
function List() {
  const [list,setList] = useState([]);
  const fetchList = async ()=>{
    try{

    
     const response = await axios.get('https://digital-menu-backend-mjz7.onrender.com/api/Menus');
    console.log(response.data);
     
      setList(response.data);
    }
     catch{
      toast.error("Error")
     }
  }
  const removeFood = async(foodId)=>{
    try {
      const response = await axios.post('https://digital-menu-backend-mjz7.onrender.com/api/removeMenus', { id: foodId });
      console.log("Remove Response:", response.data);
      // Handle the success or failure based on the server's response
      if (response.data.success) {
        await fetchList(); // Refresh the list after deletion
        toast.success(response.data.message || "Food item removed successfully");
      } else {
        toast.error(response.data.message || "Failed to remove food item");
      }
    } catch (error) {
      toast.error("Error removing food item");
      console.error("Error removing food:", error);
    }
  };
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>ALL FOOD LIST</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
         <b>Category</b>
          <b>Price</b>
          <b>Action</b>
      </div>
        {list.length > 0 ? (
          list.map((item, index) => {
            console.log("Item:", item);
            return (
              <div key={index} className="list-table-format">
                <img src={`https://digital-menu-backend-mjz7.onrender.com/uploads/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=>removeFood(item.id)} className='cursor'>X</p>
              </div>
            );
          })
        ) : (
          <p>No food items available.</p>
        )}
      </div>
      
    </div>
  )
}

export default List
