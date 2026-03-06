const Cart = require("../Models/Cart");

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, price } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if product already exists in cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            // If product exists, increase quantity
            existingItem.quantity += 1;
        } else {
            // Otherwise, add as a new product
            cart.items.push({ productId, quantity: 1, price });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
