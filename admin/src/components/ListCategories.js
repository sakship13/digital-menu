import React, { useEffect, useState } from 'react'
import  axios from 'axios'
import { toast } from 'react-toastify';
function ListCategories() {
  const [list,setList] = useState([]);
  const fetchList = async ()=>{
    try{

    
     const response = await axios.get('https://digital-menu-backend-mjz7.onrender.com/api/Category');
    console.log(response.data);
     
      setList(response.data);
    }
     catch{
      toast.error("Error")
     }
  }
  const removeCategory = async (categoryId) => {
    try {
      const response = await axios.post('https://digital-menu-backend-mjz7.onrender.com/api/removeCategory', { id: categoryId });
      console.log("Remove Response:", response.data);
      if (response.data.success) {
        await fetchList(); // Refresh the list after deletion
        toast.success(response.data.message || "Category removed successfully");
      } else {
        toast.error(response.data.message || "Failed to remove category");
      }
    } catch (error) {
      toast.error("Error removing category");
      console.error("Error removing category:", error);
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
          <b>ID</b>
         <b>Category</b>
          <b>Action</b>
      </div>
        {list.length > 0 ? (
          list.map((item, index) => {
            console.log("Item:", item);
            return (
              <div key={index} className="list-table-format">
                <img src={`https://digital-menu-backend-mjz7.onrender.com/uploads/${item.image}`} alt={item.name} />
                <p>{item.id}</p>
                <p>{item.title}</p>
                <p onClick={()=>removeCategory(item.id)} className='cursor'>X</p>
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

export default ListCategories
