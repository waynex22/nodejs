const Comment = require('../../models/Comment.models')
const Book = require('../../models/Book.models')
const { toObjects, toObject } = require('../../../util/mongoose')
class CommentAdmin {
    index(req, res, next) {
        const user = req.session.user ? req.session.user : null
        Book.find({})
            .then(books => {
                res.render('admin/comment', {
                    books: toObjects(books),
                    user: user,
                    layout: 'admin'
                })
            })
            .catch(next)
    }
   detail(req , res , next){
    const id = req.params._id
    Comment.find({id_book: id})
                    .populate('id_account')
                    .then((data) => {
                      res.render('admin/detailcomment', {
                        comments: toObjects(data),
                        layout: 'admin'
                      })
                    // res.json(toObject(comments))
                    })
                    .catch(next)
   }
    delete(req, res, next){
        Comment.deleteOne({ _id: req.params._id })
        .then(() => res.redirect('/admin/comment'))
        .catch(next)
    }
}


module.exports = new CommentAdmin