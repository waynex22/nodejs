const Book = require('../models/Book.models')
const { toObjects } = require('../../util/mongoose')
class ListBookController {
    // get /list
    index(req, res, next) {
        Book.find({})
            .then(books => {
                res.render('listBook', {
                    books: toObjects(books)
                })
            })
            .catch(next)
        }
}

module.exports = new ListBookController;