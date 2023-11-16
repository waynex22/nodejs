const Account = require('../models/Account.models')
const { toObject } = require('../../util/mongoose')
const bcrypt = require('bcrypt');
class AccountsController {
    // get /login
    login(req, res) {
        const user = req.session.user ? req.session.user : null
        req.session.returnTo = req.headers.referer || '/'
        if(user){
            res.redirect('/')
        }
        res.render('login', { message: req.flash('message') })
    }
    register(req, res) {
        res.render('register')
    }
    postRegiter(req, res) {
        Account.findOne({ name: req.body.name })
            .then((accounts => {
                if (accounts) {
                    res.render('register', { error: 'Tên đăng nhập đã tồn tại !!!' })
                } else {
                    const account = new Account(req.body)
                    account.save()
                        .then(() => {
                            req.flash('message', 'Đăng ký thành công')
                            res.redirect('login');
                        }).catch((err) => {
                            res.render('register', { error: 'Đã xảy ra lỗi khi đăng ký tài khoản' })
                        })
                }
            })).catch((err) => {
                res.render('register', { err: 'Đã xảy ra lỗi khi đăng ký tài khoản' })
            })

    }
    async postLogin(req, res) {
        const user = await Account.findOne({ name: req.body.name })
        if (!user) {
            req.flash('message', 'Không tìm thấy tài khoản')
            res.redirect('/account/login')
        }
        else {
            const password = req.body.password
            const userPassword = user.password
            const passwordHash = await bcrypt.compare(password , userPassword)
                if(passwordHash){
                    req.session.user = {
                        id: user._id,
                        name: user.name,
                        role: user.role,
                    }
                    const returnTo = req.session.returnTo || '/'
                    res.redirect(returnTo)
                }else {
                    req.flash('message', 'Sai mật khẩu')
                    res.redirect('/account/login')
                }
            
        }
    }
    postLogOut(req, res){
        req.session.destroy((err) => {
            if(err){
                console.log('destroy err session', err)
            }
            res.redirect('/account/login')
        })
    }
}
module.exports = new AccountsController;