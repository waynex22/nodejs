const Account = require('../models/Account.models')
const { toObject } = require('../../util/mongoose')
const bcrypt = require('bcrypt');
class AccountsController {
    // get /login
    login(req, res) {

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
            const pass = toObject(user).password
            res.json(bcrypt.compare(pass))
        }
        // res.json(user)
        // passport.use( new LocalStrategy({
        //     nameField: 'name',
        //     passwordField: 'password'
        //    },(name, password, done) => {
        //     Account.findOne({name: name}, (err, user) => {
        //       if(err){
        //         return done(err)
        //       }
        //       if(!user){
        //         return done(null , false, {message: res.flash('Incorect username')})
        //       }
        //       try{
        //         if(bcrypt.compare(password , user.password)){
        //           return done(null, user)
        //         }else {
        //           return done(null, false, {message: res.flash('Incorect password')})
        //         }

        //       }catch(e){
        //         return  done(e)
        //       }
        //     })
        //    }))
        //    passport.serializeUser((user, done) => {
        //     done(null, user.id)
        //    })
        //    passport.deserializeUser((id , user) => {
        //     Account.findById(id, (err, user) => {
        //       done(err, user)
        //     })
        //    })
        // res.send('login success')
    }
}
module.exports = new AccountsController;