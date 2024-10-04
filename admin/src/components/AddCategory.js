import React, { useState } from 'react';
import upload from '../admin_assets/upload_area.png';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddCategory() {
    const [image, setImage] = useState(null);  // null is better than false for file
    const [data, setData] = useState({
        title: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };


    const onImageChange = (event) => {
        // Check if a file was selected
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]); // Set the image file
        } else {
            setImage(null); // Clear the image if no file is selected
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", data.title);
        
        
        try {
            const response = await axios.post('https://digital-menu-backend-mjz7.onrender.com/api/addCategory', formData);
            if (response.data.success) {
                setData({ title: "" });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding menu item:', error);
            toast.error("Error adding menu item");
        }
    };

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? URL.createObjectURL(image) : upload} alt="" />
                    </label>
                    <input 
                        onChange={onImageChange} 
                        type="file" 
                        id='image' 
                        hidden 
                        required 
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Category Name</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.title} 
                        type="text" 
                        name='title' 
                        placeholder='Type here' 
                    />
                </div>
               
               
                <button type='submit' className='add-btn'>Add Item</button>
            </form>
        </div>
    );
}

export default AddCategory;
