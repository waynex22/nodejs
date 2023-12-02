const express = require('express')
const SiteAdmin = require('../../app/controllers/admin/Site.Admin')
const router = express.Router()

router.get('/dashBoard' , SiteAdmin.index)


module.exports = router