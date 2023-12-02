
class SiteAdmin {
    index(req, res ){
        res.render('admin/dashboard' , {layout: 'admin'})
    }
}

module.exports = new SiteAdmin