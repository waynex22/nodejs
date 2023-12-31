const express = require('express')
const path = require('path')
const db = require('./db/index')
const app = express()
const port = 3001
const hbs = require('express-handlebars')
const route = require('./routes/index.js')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash');
const helpers = require('./util/helper.js')
const methodOverride = require('method-override')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
  resave: true,
  cookie: {
    maxAge: 3600000,
  },
  saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.engine('hbs', hbs.engine({
  extname: '.hbs',
  helpers: helpers,
}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))
app.use(methodOverride('_method'))
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
db.connect()
