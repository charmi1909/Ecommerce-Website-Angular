const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    image: { type: String, required: true }
});


module.exports.Category = mongoose.model('Category', categorySchema);