const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema({
    title: {type: String},
    author: {type: String},
    image: {type: String},
    year: {type: Number},
    isbn: {type: String},
    description: {type: String},
    review_count: {type: Number, default: 0},
    average_score: {type: Number, default: 10},
})

module.exports = mongoose.model('Book', Book)