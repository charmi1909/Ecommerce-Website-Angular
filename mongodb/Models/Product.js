const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 }, 
  stock: { type: Number, required: true, min: 0 },
  images: { type: [String], required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 }, 
}, { timestamps: true });

  module.exports.Product = mongoose.model('Product', productSchema);