const express = require('express')
const router = express.Router()
const sitesController = require('../app/controllers/Sites.Controller')


router.use('/contact', sitesController.contact)
router.use('/', sitesController.home)


module.exports = router