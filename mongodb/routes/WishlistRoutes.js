const express = require("express");
const mongoose = require("mongoose");
const { Wishlist } = require("../Models/Wishlist");
const { Product } = require("../Models/Product");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        const existingProduct = wishlist.products.find(item => item.product.toString() === productId);
        if (existingProduct) {
            return res.status(400).json({ message: "Product already in wishlist." });
        }

        wishlist.products.push({ product: productId });

        await wishlist.save();

        res.status(201).json({ message: "Product added to wishlist.", wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const wishlists = await Wishlist.find().populate("user", "name email");
        res.json(wishlists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        const wishlist = await Wishlist.findOne({ user: new mongoose.Types.ObjectId(userId) })
            .populate("products.product");

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found." });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:userId/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found." });
        }

        wishlist.products = wishlist.products.filter(item => item.product.toString() !== productId);
        await wishlist.save();

        res.json({ message: "Product removed from wishlist.", wishlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
