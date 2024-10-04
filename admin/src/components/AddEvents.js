import React, { useState } from 'react';
import upload from '../admin_assets/upload_area.png';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddEvents() {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        subtitle: "",
        date: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("image", image);
        formData.append("date", data.date);
        formData.append("subtitle", data.subtitle);
        formData.append("title", data.title);

        try {
            const response = await axios.post('https://digital-menu-backend-mjz7.onrender.com/api/addEvent', formData);
            if (response.data.success) {
                setData({ title: "", subtitle: "", date: "" });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding event:', error);
            toast.error("Error adding event");
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
                        onChange={(e) => setImage(e.target.files[0])} 
                        type="file" 
                        id='image' 
                        hidden 
                        required 
                    />
                </div>
                
                <div className="add-date flex-col">
                    <p>Event Date</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.date} 
                        type="text"  // Use 'text' to allow MM/DD/YYYY format
                        name='date' 
                        placeholder='MM/DD/YYYY' 
                        required 
                    />
                </div>

                <div className="add-subtitle flex-col">
                    <p>Event Subtitle</p>
                    <textarea 
                        onChange={onChangeHandler} 
                        value={data.subtitle} 
                        name="subtitle" 
                        rows="6" 
                        placeholder='Write content here'
                        required
                    />
                </div>

                <div className="add-title flex-col">
                    <p>Event Title</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.title} 
                        type="text" 
                        name='title' 
                        placeholder='Type here' 
                        required 
                    />
                </div>

                <button type='submit' className='add-btn'>Add Event</button>
            </form>
        </div>
    );
}

export default AddEvents;
