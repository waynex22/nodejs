const express = require('express')
const router = express.Router()
const listBookController = require('../app/controllers/ListBook.Controller')

router.post('/search', listBookController.search)
router.use('/', listBookController.index)


module.exports = router