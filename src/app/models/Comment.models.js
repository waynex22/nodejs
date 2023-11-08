const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
    id_book: {type : String},
    id_account: {type: String},
    rating: {type: String},
    content: {type: String}
},
{
    timestamps: true,
})

module.exports = mongoose.model('Comment', Comment)