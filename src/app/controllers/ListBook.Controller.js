const Book = require('../models/Book.models')
const { toObjects } = require('../../util/mongoose')
class ListBookController {
    // get /list
    index(req, res, next) {
        const user = req.session.user ? req.session.user : null
        Book.find({})
            .then(books => {
                res.render('listBook', {
                    books: toObjects(books),
                    user: user,
                })
            })
            .catch(next)
    }
    async search(req, res) {
        const search = req.body.search;
        try {
            const result = await Book.find({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { isbn: search },
                    { author: { $regex: search, $options: 'i' } }
                ]
            }).exec();
            
            res.render('searchList', { result: toObjects(result) , find: search });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
}
module.exports = new ListBookController;