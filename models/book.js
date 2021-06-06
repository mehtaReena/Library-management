const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'

    },
    author: {
        type: String,
        required: true
    }
});

const BookModule = new mongoose.model('book', BookSchema);
module.exports = BookModule;