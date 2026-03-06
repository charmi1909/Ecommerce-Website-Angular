const express=require('express');
const mongoose=require('mongoose');
const { Product } = require('../Models/Product');
const {Category}=require('../Models/Category')

const router = express.Router();

// Add a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name description image');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/best-selling', async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(8).populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category'); // Populate category details
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



//product by category id
router.get('/category/:id?', async (req, res) => {
    try {
        let product = [];
        const categoryId = req.params.id; 

        console.log("Category ID:", categoryId); 
        
        if (!categoryId || categoryId.toLowerCase() === "null") {
            product = await Product.find();
        } 
        else if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID" });
        } 
        else {
            product = await Product.find({ category: categoryId });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});




// UPDATE: 
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: 
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
