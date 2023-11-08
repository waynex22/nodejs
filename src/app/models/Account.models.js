const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const Account = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String }
},
{
    timestamps: true,
});

Account.pre('save', function (next) {
    const account = this;
    if (!account.isModified('password')) return next();
    bcrypt.hash(account.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        account.password = hashedPassword;
        next();
    });
});

module.exports = mongoose.model('Account', Account);
