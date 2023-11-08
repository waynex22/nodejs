const express = require('express')
const router = express.Router()
const sitesController = require('../app/controllers/Sites.Controller')


router.get('/contact', sitesController.contact)
router.get('/', sitesController.home)


module.exports = router