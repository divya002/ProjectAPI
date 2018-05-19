var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var userRegisterModel = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    stream: {
        type: String
    },
    class: {
        type: String
    },
    previousGrade: {
        type: String
    },
    college: {
        type: String
    },
    board: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    year: {
        type: String
    },
    grade: {
        type: String
    }
});
userRegisterModel.pre('save', function (next) {
    var user = this

    if (!user.isModified('password'))
        return next()

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) return next(err)

        user.password = hash
        next()
    })
})
module.exports = mongoose.model('Users', userRegisterModel);