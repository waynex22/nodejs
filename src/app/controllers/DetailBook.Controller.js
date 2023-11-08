const Book = require('../models/Book.models')
const { toObject } = require('../../util/mongoose')
const Comment = require('../models/Comment.models')
class DetailBook {

    index(req , res , next) {
        Book.findById({_id: req.params._id})
        .then((book) => {
            res.render('detail' , {book: toObject(book)})
        }).catch(next)
    }
// binh luan
    post(req , res , next) {
       const comment = new Comment(req.body)
       const id_book = req.body.id_book
       comment.save()
       .then(() => res.redirect(`/book/${id_book}`))
       .catch((next))
    }

}
module.exports = new DetailBook