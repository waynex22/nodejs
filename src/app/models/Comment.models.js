const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
    id_book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    id_account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    rating: String,
    content: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', Comment)