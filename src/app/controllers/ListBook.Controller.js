class ListBookController {
    // get /list
    index(req , res){
        res.render('listBook')
    }
}

module.exports = new ListBookController;