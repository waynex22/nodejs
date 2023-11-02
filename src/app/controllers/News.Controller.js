class NewsController {
    // get /news
    index(req , res){
        res.render('news')
    }
    show(req , res){
        res.send('detail')
    }
}

module.exports = new NewsController;