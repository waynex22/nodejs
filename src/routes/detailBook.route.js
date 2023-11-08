const express = require('express')
const router = express.Router()
const detailBookController = require('../app/controllers/DetailBook.Controller')

router.post('/post-comment', detailBookController.post)
router.get('/:_id', detailBookController.index)

module.exports = router