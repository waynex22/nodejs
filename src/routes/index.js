const newsRouter = require('./news.route')
const sitesRouter = require('./sites.route')
const listBookRouter = require('./listBook.route')
const detailBookRouter = require('./detailBook.route')
const accountRouter = require('./account.route')
const siteAdmin = require('./Admin/site.router.admin')
const productAdminRouter = require('./Admin/product.router.admin')
const commentAdminRouter = require('./Admin/comment.router.admin')
const checkUser = require('../util/checkUser')
const route = (app) => {
      
      app.use('/news' , newsRouter)
      app.use('/listBook', listBookRouter)
      app.use('/book', detailBookRouter)
      app.use('/account', accountRouter)
      app.use('/admin',checkUser, siteAdmin)
      app.use('/admin/product',checkUser, productAdminRouter)
      app.use('/admin/comment',checkUser, commentAdminRouter)
      app.use('/', sitesRouter)
}
module.exports = route 