class SitesController {
    // get /home
    home(req , res){
        res.render('home')
    }
    contact (req , res){
        res.render('contact')
    }
}

module.exports = new SitesController;