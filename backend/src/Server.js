const express = require('express');

const fs = require('fs');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Menu_cart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Define the Menu schema
const menuSchema = new mongoose.Schema({
  category:String,
  name: String,
  image: String,
  description: String,
  price: Number,
});
//define category schema
const categorySchema = new mongoose.Schema({
  image: String,
  title: String,
  
  
});
//chef login schema
const chefschema = new mongoose.Schema({
  email:String,
  password:String,
});
//order schema


// Define the order schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone:{ type: Number, required: true },   
  items: { type: Array, required: true } , 
  amount: { type: Number, required: true },    
  odstatus: { type: String, enum: ['Food Processing', 'Out for Serving', 'Served'],default: 'Food Processing' }, 
  date: { type: Date, default: Date.now },    
});

// Create models from the schema
const Order = mongoose.model('Order', orderSchema, 'orders');
const chefDetails=mongoose.model('chefModel',chefschema,'chefDetails');
const category=mongoose.model('Categories',categorySchema,'Category');
// Create a model from the schema
const Menu = mongoose.model('Menu', menuSchema, 'Menus');
// Define a route to fetch categories
app.get('/api/Category', async (req, res) => {
  try {
    const categories = await category.find();
    res.json(categories);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: err.message });
  }
});

// api route to fetch food item
app.get('/api/Menus', async (req, res) => {
  try {
    const menus = await Menu.find();
    console.log(menus); // Log the fetched data
    res.json(menus);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: err.message });
  }
});
const storage = multer.diskStorage({
  destination: 'uploads', // Directory to store the uploaded images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with a timestamp
  },
});
const upload = multer({ storage: storage });

// api to add the food item
app.post('/api/addMenus', upload.single('image'), async (req, res) => {
  try {
    // Extract form data
    const { category, name, description, price } = req.body;
    const image_filename = req.file.filename; // Get the uploaded image filename

    // Create a new Menu item
    const newMenu = new Menu({
      category,
      name,
      image: image_filename, // Save the image filename
      description,
      price,
    });

    // Save the new menu item to the database
    await newMenu.save();

    // Send success response
    res.json({ success: true, message: 'Menu item added successfully' });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: err.message });
  }
});
app.use("/images",express.static('uploads'))
//api endpoint to remove food item
app.post('/api/removeMenus', async (req, res) => {
   try{
     const food= await Menu.findById(req.body.id);
     fs.unlink(`uploads/${food.image}`,()=>{})
     await Menu.findByIdAndDelete(req.body.id);
    
     res.json({ success: true, message: 'Food item removed ' });
   }catch(err){
    console.error(err); // Log the error
    res.status(500).json({ message: err.message });
   }
});
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user in the database
    const user = await chefDetails.findOne({ email });

    // Check if user exists and password matches
    if (user && user.password === password) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/placeOrder', async (req, res) => {
  try {
    const { details, items, amount } = req.body;

    const { firstName, lastName, phone } = details; // Destructure details
    

    
    // Generate a unique order ID
    const orderID = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create and save the new order
    const newOrder = new Order({
      orderId: orderID,
      firstName,
      lastName,
      phone,
      items, // Items with quantities
      amount,
    });

    await newOrder.save();

    res.json({ success: true, message: 'Order placed successfully', orderID });
  } catch (error) {
    console.error('Error placing the order:', error);
    res.status(500).json({ message: 'Failed to place the order' });
  }
});
app.get('/api/userOrders', async (req, res) => {
  try {
    const orders = await Order.find(); // You can filter by user if required
    console.log(orders); // Log the fetched data
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: err.message });
  }
});
app.post('/api/updateStatus', async (req, res) => {
  try {
      console.log(req.body); // Log the incoming request body
      await Order.findByIdAndUpdate(req.body.orderId, { odstatus: req.body.odstatus });
      res.json({ success: true, message: "Status Updated" });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});








