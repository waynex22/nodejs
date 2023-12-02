const express = require('express')
const ProductAdmin = require('../../app/controllers/admin/Product.admin')
const router = express.Router()
const upload = require('../../util/upload')

router.get('/', ProductAdmin.index)
router.get('/edit/:_id' , ProductAdmin.edit)
router.get('/add' , ProductAdmin.add)
router.post('/addNew', upload.single('image') , ProductAdmin.postAdd)
router.put('/update/:_id', upload.single('image') , ProductAdmin.postEdit)
router.get('/delete/:_id' , ProductAdmin.delete)
module.exports = router