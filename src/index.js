const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()
const port = 3000
const hbs  = require('express-handlebars')
const route = require('./routes')


app.engine('hbs', hbs.engine({
  extname: '.hbs'
}))
app.use(express.static(path.join(__dirname , 'public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))
// app.use(morgan('combined'))
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})