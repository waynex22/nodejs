const newsRouter = require('./news.route')
const sitesRouter = require('./sites.route')
const listBook = require('./listBook.route')
const route = (app) => {
      app.use('/listBook', listBook )
      app.use('/news' , newsRouter)
      app.use('/', sitesRouter)
}
module.exports = route 