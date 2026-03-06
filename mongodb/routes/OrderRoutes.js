const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Order=require('../Models/Order')
const Product=require('../Models/Product')

const app = express();
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log("Received order data:", req.body); 
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(400).json({ error: error.message });
    }
});

// Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .populate('userId', 'name') 
            .populate('items.productId', 'name price images'); 
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an order by ID
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .populate('userId', 'name')
            .populate('items.productId', 'name price images');

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update an order by ID
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
