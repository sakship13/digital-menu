const express = require('express');
//const mongoose = require('mongoose');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = process.env.PORT ||3307; // You can use any port you prefer
app.use(cors()); // Use the cors middleware to allow cross-origin requests

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json());

const multer = require('multer');
//const upload = multer();

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
	const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
    //cb(null, file.originalname); // Use the original file name
	cb(null, uniqueFilename); // Use the original file name
  }
});

const upload = multer({ storage: storage });

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'menu_cart',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define an API endpoint to interact with the database
app.get('/api/Menus', (req, res) => {
  const sql = 'SELECT * FROM menu';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});
app.get('/api/Category', async (req, res) => {
  try {
    const sql = 'SELECT * FROM categories'; // Change 'categories' to your actual table name
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err); // Log the error
        return res.status(500).json({ message: err.message });
      }
      res.json(results); // Send the results back as JSON
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: err.message });
  }
});
app.post('/api/addCategory', upload.single('image'), (req, res) => {
  const { title } = req.body;  // Get the title from the request body
  const image = req.file ? req.file.filename : null;  // Handle image upload

  // SQL query to insert into categories (id is auto-incremented)
  const sql = 'INSERT INTO categories (title, image) VALUES (?, ?)';
  
  db.query(sql, [title, image], (err, result) => {
    if (err) {
      console.error('Error inserting category:', err);
      return res.status(500).json({ success: false, message: 'Error adding category' });
    }
    res.json({ success: true, message: 'Category added successfully' });
  });
});
app.post('/api/login', async (req, res) => {
  const { email, pass } = req.body;
  console.log("Received email and password:", email, pass); // Log incoming data

  const sql = 'SELECT * FROM chefreg WHERE email = ? AND pass = ?';
  const values = [email, pass];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 1) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Login failed' });
    }
  });
});


// Define an API endpoint to insert data
app.post('/api/addMenus', upload.single('image'), async (req, res) => {
  try {
      const { category, name, description, price } = req.body;
      const image_filename = req.file.filename; // Ensure the image is being uploaded correctly

      // SQL query to insert into the menu table
      const sql = 'INSERT INTO menu (category, name, image, description, price) VALUES (?, ?, ?, ?, ?)';
      const values = [category, name, image_filename, description, price];

      // Execute the query
      db.query(sql, values, (err, results) => {
          if (err) {
              console.error('Error inserting data into the database:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }
          res.json({ success: true, message: 'Menu item added successfully' });
      });
  } catch (err) {
      console.error('Error during the menu item insertion:', err);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to remove menu items
// Route to remove menu items
app.post('/api/removeMenus', async (req, res) => {
  const { id } = req.body; // Extract the menu item ID from the request body
  const sqlFind = 'SELECT image FROM menu WHERE id = ?';
  const sqlDelete = 'DELETE FROM menu WHERE id = ?';

  try {
    // Find the menu item by its ID and get the image filename
    db.query(sqlFind, [id], (err, results) => {
      if (err) {
        console.error('Error finding data in the database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        const image_filename = results[0].image;

        // Delete the image file from the uploads folder
        fs.unlink(`uploads/${image_filename}`, (fsErr) => {
          if (fsErr) {
            console.error('Error deleting the image file:', fsErr);
          }
        });

        // Delete the menu item from the database
        db.query(sqlDelete, [id], (err, deleteResults) => {
          if (err) {
            console.error('Error deleting data from the database:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }

          res.json({ success: true, message: 'Food item removed successfully' });
        });
      } else {
        res.status(404).json({ message: 'Menu item not found' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//route to place order
app.post('/api/placeOrder', async (req, res) => {
  const { details, items, amount } = req.body;
  const { firstName, lastName, phone } = details;

  // Generate a unique order ID
  const orderID = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // SQL query to insert the order
  const sql = 'INSERT INTO orders (orderId, firstName, lastName, phone, items, amount) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [orderID, firstName, lastName, phone, JSON.stringify(items), amount];

  try {
    // Insert the new order into the database
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error placing the order:', err);
        return res.status(500).json({ message: 'Failed to place the order' });
      }
      res.json({ success: true, message: 'Order placed successfully', orderID });
    });
  } catch (error) {
    console.error('Error placing the order:', error);
    res.status(500).json({ message: 'Failed to place the order' });
  }
});
app.get('/api/userOrders', async (req, res) => {
  const sql = 'SELECT * FROM orders';

  try {
    // Fetch all orders from the database
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ message: 'Failed to fetch orders' });
      }
      console.log(results); // Log the fetched data
      res.json({ success: true, data: results });
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});
app.post('/api/removeCategory', async (req, res) => {
  const { id } = req.body; // Extract the category ID from the request body
  const sqlFind = 'SELECT image FROM categories WHERE id = ?'; // Assuming you have a 'category' table
  const sqlDelete = 'DELETE FROM categories WHERE id = ?'; // Adjust the SQL to match your table

  try {
      // Find the category by its ID and get the image filename
      db.query(sqlFind, [id], (err, results) => {
          if (err) {
              console.error('Error finding data in the database:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }

          if (results.length > 0) {
              const image_filename = results[0].image;

              // Delete the image file from the uploads folder
              fs.unlink(`uploads/${image_filename}`, (fsErr) => {
                  if (fsErr) {
                      console.error('Error deleting the image file:', fsErr);
                  }
              });

              // Delete the category from the database
              db.query(sqlDelete, [id], (err, deleteResults) => {
                  if (err) {
                      console.error('Error deleting data from the database:', err);
                      return res.status(500).json({ message: 'Internal server error' });
                  }

                  res.json({ success: true, message: 'Category removed successfully' });
              });
          } else {
              res.status(404).json({ message: 'Category not found' });
          }
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
});
app.post('/api/updateStatus', async (req, res) => {
  const { orderId, odstatus } = req.body;

  const sql = 'UPDATE orders SET odstatus = ? WHERE orderId = ?';

  try {
    // Update the order status in the database
    db.query(sql, [odstatus, orderId], (err, results) => {
      if (err) {
        console.error('Error updating order status:', err);
        return res.status(500).json({ message: 'Failed to update order status' });
      }
      res.json({ success: true, message: 'Status Updated' });
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});
app.post('/api/addEvent', upload.single('image'), async (req, res) => {
  const { title, subtitle, date } = req.body;
  const image = req.file ? req.file.filename : null; // Get the filename from multer

  const sqlInsert = 'INSERT INTO events (image, date, subtitle, title) VALUES (?, ?, ?, ?)';
  
  try {
      db.query(sqlInsert, [image, date, subtitle, title], (err, result) => {
          if (err) {
              console.error('Error inserting data into the database:', err);
              return res.status(500).json({ success: false, message: 'Internal server error' });
          }
          res.json({ success: true, message: 'Event added successfully' });
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
});
app.get('/api/events', async (req, res) => {
  const sqlSelect = 'SELECT * FROM events';

  try {
      db.query(sqlSelect, (err, results) => {
          if (err) {
              console.error('Error fetching events:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }
          res.json(results); // Send the list of events
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
});
// Remove Event API
app.post('/api/removeEvent', async (req, res) => {
  const { id } = req.body; // Extract the event ID from the request body
  const sqlFind = 'SELECT image FROM events WHERE id = ?';
  const sqlDelete = 'DELETE FROM events WHERE id = ?';

  try {
      // Find the event by its ID and get the image filename
      db.query(sqlFind, [id], (err, results) => {
          if (err) {
              console.error('Error finding event in the database:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }

          if (results.length > 0) {
              const image_filename = results[0].image;

              // Delete the image file from the uploads folder
              fs.unlink(`uploads/${image_filename}`, (fsErr) => {
                  if (fsErr) {
                      console.error('Error deleting the image file:', fsErr);
                  }
              });

              // Delete the event from the database
              db.query(sqlDelete, [id], (err, deleteResults) => {
                  if (err) {
                      console.error('Error deleting event from the database:', err);
                      return res.status(500).json({ message: 'Internal server error' });
                  }

                  res.json({ success: true, message: 'Event removed successfully' });
              });
          } else {
              res.status(404).json({ message: 'Event not found' });
          }
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

