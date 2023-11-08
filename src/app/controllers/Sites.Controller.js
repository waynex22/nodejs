const Book = require('../models/Book.models')
const { toObjects } = require('../../util/mongoose')
class SitesController {
    // get /home
    home(req, res, next) {
        // res.render('home')
        Book.find({})
            .then(books => {
                res.render('home', {
                    books: toObjects(books),
                })
            })
            .catch(next)

    }
    contact(req, res) {
        res.render('contact')
    }
}

module.exports = new SitesController;