const Book = require('../models/Book.models')
const { toObject, toObjects } = require('../../util/mongoose')
const Comment = require('../models/Comment.models')
class DetailBook {

    index(req, res, next) {
        const user = req.session.user ? req.session.user : null;
        const bookId = req.params._id;
        Book.findById({ _id: bookId })
            .then((book) => {
                Comment.find({ id_book: bookId })
                    .populate('id_account')
                    .then((comments) => {
                        Book.find({})
                            .then((books) => {
                                res.render('detail',
                                    {
                                        book: toObject(book),
                                        user: user,
                                        comments: toObjects(comments),
                                        books: toObjects(books),
                                        error: req.flash('error')
                                    });
                            })
                    })
                    .catch(next);
            })
            .catch(next);
    }
    // binh luan
    post(req, res, next) {
        const comment = new Comment(req.body)
        const id_book = req.body.id_book
        const userId = req.body.id_account
        Comment.findOne({ id_book: id_book, id_account: userId })
            .then(existingComment => {
                if (existingComment) {
                    req.flash('error', 'Bạn chỉ có thể bình luận 1 lần !!!')
                    // console.log('Flash Message:', req.flash('error'))
                    res.redirect(`/book/${id_book}`)
                } else {
                    comment.save()
                        .then(async () => {
                            try {
                                const comments = await Comment.find({ id_book: id_book }).exec();
                                const sumOfRatings = comments.reduce((accumulator, comment) => {
                                    const rating = parseInt(comment.rating, 10);
                                    if (!isNaN(rating)) {
                                        return accumulator + rating;
                                    }
                                    return accumulator;
                                }, 0);
                                const averageScore = (sumOfRatings / comments.length) * 2
                                console.log('id_book:', id_book);
                                const updateCount = await Book.findByIdAndUpdate(
                                    id_book,
                                    {
                                        $inc: { review_count: 1 },
                                        $set: { average_score: Number(averageScore.toFixed(2)) }
                                    },
                                    { new: true }
                                );
                                if (updateCount) {
                                    res.redirect(`/book/${id_book}`);
                                } else {
                                    res.status(404).send('Không tìm thấy sách');
                                }
                            } catch (error) {
                                console.error(error);
                                res.status(500).send('Lỗi server');
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            res.status(500).send('Lỗi server');
                        });
                }
            })
            .catch(next)
    }

}

module.exports = new DetailBook