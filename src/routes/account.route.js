const express = require('express')
const router = express.Router()
const accountsController = require('../app/controllers/Accounts.Controller')
const passport = require('passport')

router.use('/register', accountsController.register)
router.use('/login', accountsController.login)
router.post('/registerAccount' , accountsController.postRegiter)
router.post('/postLogin' , accountsController.postLogin)
router.post('/logout' , accountsController.postLogOut)

module.exports = router