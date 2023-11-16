class NewsController {
    // get /news
    index(req , res){
        const user = req.session.user ? req.session.user : null
        res.render('news', {user: user})
    }
    show(req , res){
        res.send('detail')
    }
}

module.exports = new NewsController;