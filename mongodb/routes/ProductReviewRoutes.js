const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {ProductReview}=require('../Models/ProductReview')

const app = express();
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
    try {
        const review = new ProductReview(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await ProductReview.find().populate('userId productId');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await ProductReview.findById(req.params.id).populate('userId productId');
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a review by ID
router.put('/:id', async (req, res) => {
    try {
        const review = await ProductReview.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a review by ID
router.delete('/:id', async (req, res) => {
    try {
        const review = await ProductReview.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
