require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());  
app.use(bodyParser.json()); 


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);


const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },  
});

const Product = mongoose.model('Product', ProductSchema);


const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Invalid token.' });
    }
    req.user = user;  
    next();
  });
};


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();  
    res.json(products);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching products', error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId); 
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching product details', error: err.message });
  }
});

app.post('/api/products', authenticateJWT, async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;

  try {
    const newProduct = new Product({ name, price, description, category, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct); 
  } catch (err) {
    res.status(400).send({ message: 'Error creating product', error: err.message });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.send({ token });
    } else {
      res.status(401).send({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error.' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).send({ message: 'Error registering user.', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
