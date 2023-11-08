const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Account = require('../app/models/Account.models')
module.exports = (passport) => {

 passport.use( new LocalStrategy({
  nameField: 'name',
  passwordField: 'password'
 },(name, password, done) => {
  Account.findOne({name: name}, (err, user) => {
    if(err){
      return done(err)
    }
    if(!user){
      return done(null , false, {message: 'Incorect username'})
    }
    try{
      if(bcrypt.compare(password , user.password)){
        return done(null, user)
      }else {
        return done(null, false, {message: 'Incorect password'})
      }

    }catch(e){
      return  done(e)
    }
  })
 }))

 passport.serializeUser((user, done) => {
  done(null, user.id)
 })
 passport.deserializeUser((id , user) => {
  Account.findById(id, (err, user) => {
    done(err, user)
  })
 })

}