const express = require('express')
const CommentAdmin = require('../../app/controllers/admin/Comment.admin')
const router = express.Router()
router.get('/', CommentAdmin.index)
router.get('/detail/:_id' , CommentAdmin.detail)
router.get('/delete/:_id' , CommentAdmin.delete)
module.exports = router