const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../Models/Cart');
const router = express.Router();

// Add item to cart (User must be logged in)
router.post('/', async (req, res) => {
    try {
        const { productId, quantity, price, userId } = req.body;        
        console.log(req.body)
        let cart = await Cart.findOne({userId});
        console.log("Cart: ", cart)

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity, price }] });
        } else {
            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity, price });
            }
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get user's cart
router.get('/:userId', async (req, res) => {
    console.log(req.params.userId)
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove item from cart
router.delete('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
      const result = await Cart.findOneAndUpdate(
        { "items._id": productId },
        { $pull: { items: { _id: productId } } },
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      res.status(200).json({ message: "Item removed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item" });
    }
  });
  

router.delete('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        await Cart.findOneAndDelete({ userId });
        res.json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:cartId/items/:itemId', async (req, res) => {
    try {
      const { cartId, itemId } = req.params;
      const { quantity } = req.body;
  
      if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }
  
      const cart = await Cart.findById(cartId);
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      const item = cart.items.find(i => i._id.toString() === itemId);
      if (!item) return res.status(404).json({ message: "Item not found" });
  
      item.quantity = quantity;
      await cart.save();
  
      res.json({ message: "Cart updated successfully", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  
module.exports = router;
