require('dotenv').config();   
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const UserRoutes = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const CartRoutes = require('./routes/CartRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
const ProductReview = require('./routes/ProductReviewRoutes');
const Login = require('./routes/Login');
const WishlistRoutes = require("./routes/WishlistRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);
app.use('/wishlists', WishlistRoutes);
app.use('/carts', CartRoutes);
app.use('/category', CategoryRoutes);
app.use('/order', OrderRoutes);
app.use('/productreview', ProductReview);
app.use('/auth', Login);

// ✅ CONNECT USING ENV VARIABLE
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
    
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('Connection error:', err));
