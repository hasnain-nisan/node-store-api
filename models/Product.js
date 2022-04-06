const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price can not be empty'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos', 'aurous'],
            message: '{VALUE} is not supported'
        }
        // enum: ['ikea', 'liddy', 'caressa', 'marcos', 'Aurous']
    },
})


module.exports = mongoose.model('Product', productSchema)