import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Experiment() {


  const [menuItems, setMenuItems] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    Category: '',
    MenuTitle: '',
    Price: '',
    Description: '',
  });

  // Fetch existing menu items when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getMenuItems'); // Update with your API endpoint
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        alert('Error fetching menu items.');
      }
    };

    fetchData();
  }, []);

  // Handle input changes for text and select fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file changes for image upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form data to add a new menu item
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    let errors = [];
    if (!formData.Category) errors.push('Select Category.');
    if (!formData.MenuTitle) errors.push('Enter Menu Title.');
    if (!formData.Price || isNaN(formData.Price)) errors.push('Enter a valid Price.');
    if (!formData.Description) errors.push('Enter Description.');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const submitData = new FormData();
    submitData.append('Category', formData.Category);
    submitData.append('MenuTitle', formData.MenuTitle);
    submitData.append('Price', formData.Price);
    submitData.append('Description', formData.Description);
    submitData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3001/api/addMenuItem', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Menu item added successfully!');
      // Add the new menu item to the list
      setMenuItems([...menuItems, response.data]);
    } catch (error) {
      console.error('Error submitting menu item:', error);
      alert('Failed to add menu item. Please try again.');
    }
  };

  return (
    <div className="experiment-container">
      <h1 className="title">Add Menu Item</h1>
      <hr />

      <div className="form-container">
        <form onSubmit={handleSubmit} className="experiment-form">
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              name="Category"
              className="form-input"
              id="category"
              onChange={handleInputChange}
              value={formData.Category}
            >
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="menuTitle" className="form-label">Menu Title</label>
            <input
              type="text"
              name="MenuTitle"
              className="form-input"
              id="menuTitle"
              placeholder="Menu Title"
              onChange={handleInputChange}
              value={formData.MenuTitle}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              name="Price"
              className="form-input"
              id="price"
              placeholder="Price"
              onChange={handleInputChange}
              value={formData.Price}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="Description"
              className="form-input"
              id="description"
              placeholder="Description"
              onChange={handleInputChange}
              value={formData.Description}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input
              type="file"
              name="image"
              className="form-input"
              id="image"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>

        <hr />

        <div className="table-container">
          <h4>Menu Items Table</h4>
          <div className="table-responsive">
            <table className="category-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Menu Title</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Category}</td>
                    <td>{item.MenuTitle}</td>
                    <td>{item.Price}</td>
                    <td>{item.Description}</td>
                    <td>
                      {item.Image ? (
                        <img src={URL.createObjectURL(item.Image)} alt={item.MenuTitle} width="50" height="50" />
                      ) : (
                        'No Image'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experiment;
