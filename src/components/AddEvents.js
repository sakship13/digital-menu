import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    image: null,
  });

  // Fetch existing events when the component loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getEvents'); // Adjust API endpoint as needed
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Error fetching events.');
      }
    };

    fetchEvents();
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

  // Submit form data to add a new event
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title) {
      alert('Event title is required.');
      return;
    }

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('date', formData.date);
    submitData.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:3001/api/addEvent', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Event added successfully!');
      // Add the new event to the list
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Failed to add event. Please try again.');
    }
  };

  return (
    <div className="events-container">
      <h1 className="events-title">Add New Event</h1>

      <div className="events-form-container">
        <form onSubmit={handleSubmit} className="events-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Event Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-input"
                onChange={handleInputChange}
                value={formData.title}
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
          </div>

          <button type="submit" className="submit-button">Add Event</button>
        </form>
      </div>

      <div className="events-table-container">
        <h4>Event Table</h4>
        <div className="table-responsive">
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Date</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{event.title}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>
                    <img
                      src={URL.createObjectURL(event.image)}
                      alt={event.title}
                      width="50"
                      height="50"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddEvents;
