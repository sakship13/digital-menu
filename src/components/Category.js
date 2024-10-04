import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Category() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: '',
    image: null,
    date: new Date().toISOString().split('T')[0], // Default to today's date
  });

  // Fetch existing categories when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getCategories'); // Adjust API endpoint as needed
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Error fetching categories.');
      }
    };

    fetchData();
  }, []);

  // Handle input changes for text and date fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file changes for image upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Submit form data to add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.categoryName) {
      alert('Category name is required.');
      return;
    }

    const submitData = new FormData();
    submitData.append('categoryName', formData.categoryName);
    submitData.append('image', formData.image);
    submitData.append('date', formData.date);

    try {
      const response = await axios.post('http://localhost:3001/api/addCategory', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Category added successfully!');
      // Add the new category to the list
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error('Error submitting category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  return (
    <div className="category-container">
      <h1 className="title">Add to Category</h1>
      <hr />

      <div className="form-container">
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="categoryName" className="form-label">Category Name</label>
            <input
              type="text"
              name="categoryName"
              id="categoryName"
              className="form-input"
              onChange={handleInputChange}
              value={formData.categoryName}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-input"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-input"
              onChange={handleInputChange}
              value={formData.date}
              required
            />
          </div>

          <button type="submit" className="submit-button">Add Category</button>
        </form>

        <hr />

        <div className="table-container">
          <h4>Category Table</h4>
          <div className="table-responsive">
            <table className="category-table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Image</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category.categoryName}</td>
                    <td>
                      <img
                        src={URL.createObjectURL(category.image)}
                        alt={category.categoryName}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{new Date(category.date).toLocaleDateString()}</td>
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

export default Category;
