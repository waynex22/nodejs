const Book = require('../models/Book.models')
const { toObjects } = require('../../util/mongoose')
class SitesController {
    // get /home
    home(req, res, next) {
        // res.render('home')
        const user = req.session.user ? req.session.user : null
        Book.find({})
            .then(books => {
                res.render('home', {
                    books: toObjects(books),
                    user: user,
                })
            })
            .catch(next)

    }
    contact(req, res) {
        const user = req.session.user ? req.session.user : null
        res.render('contact',
        {
            user : user
        })
    }
}

module.exports = new SitesController;