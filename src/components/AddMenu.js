// src/components/AddProduct.js
import React, { useState } from 'react';

const AddMenu = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, image, description, price: parseFloat(price) };

    // Send a POST request to the server
    try {
        const response = await fetch('https://digital-menu-backend-mjz7.onrender.com/api/Menus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log('Server response:', data); // Log server response
        setName('');
        setImage('');
        setDescription('');
        setPrice('');
      } catch (error) {
        console.error('Error:', error); // Log fetch errors
      }
    };
  return (
    <>
    {/* <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form> */}
       <section className="section testi text-center has-bg-image"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/testimonial-bg.jpg)`}} aria-label="testimonials">
        <div className="container">

          <div className="quote">”</div>

          <p className="headline-2 testi-text">
          Add Menu
          </p>

          <div className="wrapper">
            <div className="separator"></div>
            <div className="separator"></div>
            <div className="separator"></div>
          </div>

          <div className="profile">
            <img src={`${process.env.PUBLIC_URL}/images/testi-avatar.jpg`} width="100" height="100" loading="lazy" alt="Sam Jhonson"
              className="img"/>

            <p className="label-2 profile-name">Sam Jhonson</p>
          </div>

        </div>
      </section>
       <section class="reservation" id='contact'>
        <div class="container">

          <div class="form reservation-form bg-black-10">

            <form action="" class="form-left">

              <h2 class="headline-1 text-center">Add Menu Items</h2>

              <p class="form-text text-center">
                Booking request <a href="tel:+88123123456" class="link">+88-123-123456</a>
                or fill out the order form
              </p>

              <div class="input-wrapper">
                <input type="text" name="name" placeholder="Dish Name" autocomplete="off" class="input-field"/>

                <input type="tel" name="phone" placeholder="Dish Price" autocomplete="off" class="input-field"/>
              </div>

              <div class="input-wrapper">

                <div class="icon-wrapper">
                  <ion-icon name="person-outline" aria-hidden="true"></ion-icon>

                  <select name="person" class="input-field">
                    <option value="1-person">Breakfast</option>
                    <option value="2-person">Lunch</option>
                    <option value="3-person">Drinks</option>
                  </select>

                  <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                </div>

                <div class="icon-wrapper">
                  <ion-icon name="calendar-clear-outline" aria-hidden="true"></ion-icon>

                  <input type="date" name="reservation-date" class="input-field"/>

                  <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                </div>
                <div class="icon-wrapper">
                  {/* <ion-icon name="calendar-clear-outline" aria-hidden="true"></ion-icon> */}

                  <input type="file" name="image" class="input-field"/>

                 
                </div>


              </div>

              <textarea name="message" placeholder="Description" autocomplete="off" class="input-field"></textarea>

              <button type="submit" class="btn btn-secondary">
                <span class="text text-1">Add To Menu</span>

                <span class="text text-2" aria-hidden="true">Add To Menu</span>
              </button>

            </form>

            <div class="form-right text-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/form-pattern.png)`}}>

              <h2 class="headline-1 text-center">Contact Us</h2>

              <p class="contact-label">Booking Request</p>

              <a href="tel:+88123123456" class="body-1 contact-number hover-underline">+88-123-123456</a>

              <div class="separator"></div>

              <p class="contact-label">Location</p>

              <address class="body-4">
                Restaurant St, Delicious City, <br/>
                London 9578, UK
              </address>

              <p class="contact-label">Lunch Time</p>

              <p class="body-4">
                Monday to Sunday <br/>
                11.00 am - 2.30pm
              </p>

              <p class="contact-label">Dinner Time</p>

              <p class="body-4">
                Monday to Sunday <br/>
                05.00 pm - 10.00pm
              </p>

            </div>

          </div>

        </div>
      </section>

    {/* </div> */}
    </>
  );
};

export default AddMenu;
