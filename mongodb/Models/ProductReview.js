const mongoose = require('mongoose');

const ProductReviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    date: { type: Date, default: Date.now }
});



module.exports.ProductReview = mongoose.model('ProductReview', ProductReviewSchema);
