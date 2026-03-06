const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, required: false, trim: true },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
      }
    ],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cartId:{type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}
}, { timestamps: true });


module.exports.User = mongoose.model('User', userSchema); 