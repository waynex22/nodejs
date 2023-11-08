const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema({
    title: {type: String},
    author: {type: String},
    image: {type: String},
    year: {type: Number},
    isbn: {type: String}
})
module.exports = mongoose.model('Book', Book)