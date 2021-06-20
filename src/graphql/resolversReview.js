const Review = require('../models/review.js');
const jwt = require('jsonwebtoken')


function reviews() {
    return Review.find({})
}

function reviewsOneUser(args) {
    if (!args.reviewInput.token) return 'Acceso denegado'
    return Review.find({"usuario":args.reviewInput.usuario})
}

function reviewID(args) {
    if (!args.reviewInput.token) return 'Acceso denegado'
    return Review.findById(args.id)
}

async function OneReview(args) {
    if (!args.reviewInput.token) return 'Acceso denegado'
    let oneReview = await Review.findOne({id: args.reviewInput.id})
    return JSON.stringify(oneReview);
}

async function createReview(args) {
    if (!args.reviewInput.token) return 'Acceso denegado'
    try {
        const verified = jwt.verify(args.reviewInput.token, process.env.TOKEN_SECRET)
        let review = new Review({
            usuario: args.reviewInput.usuario,
            videojuego: args.reviewInput.videojuego,
            review: args.reviewInput.review
        });
        const savedReview = await review.save();
        return JSON.stringify(savedReview);


    } catch (error) {
        return 'token no es válido'
    }

}

async function deleteReview(args) {
    let DeleteReview = await Review.findByIdAndRemove(args.id);
    return JSON.stringify(DeleteReview);
}

async function updateReview(args) {
    if (!args.reviewInput.token) return 'Acceso denegado'
    let UpdateReview = await Review.findByIdAndUpdate(args.id, args.ReviewInput, {new: true});
    return JSON.stringify(UpdateReview);
}

module.exports = { reviewID,OneReview, reviewsOneUser, reviews, createReview, deleteReview, updateReview }


