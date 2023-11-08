const newsRouter = require('./news.route')
const sitesRouter = require('./sites.route')
const listBookRouter = require('./listBook.route')
const detailBookRouter = require('./detailBook.route')
const accountRouter = require('./account.route')
const route = (app) => {
      
      app.use('/news' , newsRouter)
      app.use('/listBook', listBookRouter)
      app.use('/book', detailBookRouter)
      app.use('/account', accountRouter)
      app.use('/', sitesRouter)
      
}
module.exports = route 