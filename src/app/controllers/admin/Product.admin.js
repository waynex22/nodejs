const Book = require('../../models/Book.models')
const { toObjects, toObject } = require('../../../util/mongoose')
const upload = require('../../../util/upload')
class ProductAdmin {
    index(req, res, next) {
        const user = req.session.user ? req.session.user : null
        Book.find({})
            .then(books => {
                res.render('admin/product', {
                    products: toObjects(books),
                    user: user,
                    layout: 'admin'
                })
            })
            .catch(next)
    }
    edit(req, res, next) {
        const user = req.session.user ? req.session.user : null
        const idProduct = req.params._id
        Book.findById({ _id: idProduct })
            .then((product) => {
                res.render('admin/editProduct',
                    {
                        product: toObject(product),
                        user: user,
                        error: req.flash('error'),
                        layout: 'admin'
                    });
            })
            .catch(next);
    }
    add(req, res, next) {
        const user = req.session.user ? req.session.user : null

        res.render('admin/addProduct',
            {
                user: user,
                layout: 'admin'
            });
    }

    postAdd(req, res) {
        const { title, author, year, isbn, description} = req.body;
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const imagePath = req.file.filename;
        console.log(imagePath);
        const newBook = new Book({
            title, author, year, isbn, description, image: imagePath
        });
        newBook.save()
        .then(() => {
            res.redirect('/admin/product');
        })
        .catch((error) => {
            res.status(500).send('Error saving book: ' + error.message);
        });
       
    }
    postEdit(req, res, next){
        const imagePath = req.file ? req.file.filename : req.body.originalImage;        
        const fieldProduct = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            image: imagePath,
            isbn: req.body.isbn,
            description: req.body.description
        }
        
        Book.updateOne({_id: req.params._id}, { $set: fieldProduct })
            .then(() => res.redirect('/admin/product'))
            .catch(next)
    }
    delete(req, res, next){
        Book.deleteOne({ _id: req.params._id })
        .then(() => res.redirect('/admin/product'))
        .catch(next)
    }
}


module.exports = new ProductAdmin