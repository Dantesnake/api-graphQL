const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    usuario: {
        type: String,
        required: true,
    },
    videojuego: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('Review', reviewSchema);
