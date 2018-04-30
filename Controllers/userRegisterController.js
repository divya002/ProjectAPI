var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple')

var userRegisterController = function (userRegister) {
    var get = function (req, res) {
        query = {};
        if (req.query.stream) {
            query.stream = req.query.stream;
        }
        userRegister.find(query, function (err, users) {
            if (err)
                res.status(500).send(err);
            else {
                var returnUsers = [];
                users.forEach(function (element) {
                    var newUser = element.toJSON();
                    newUser.links = {};
                    newUser.links.self = 'http://' + req.headers.host + '/api/users/' + newUser._id;
                    newUser.links.Reference = "divyaprakash002@gmail.com"
                    returnUsers.push(newUser);
                });
                res.json(returnUsers);
            }
        })
    };
    var post = function (req, res) {
        var user = new userRegister(req.body);
        // user.save();
        user.save((err, newUser) => {
            if (err)
                return res.status(500).send({
                    message: 'Error saving user'
                })

            createSendToken(res, newUser)
        })
        // res.status(201).send(user);
    };
    var login = async function (req, res) {
        var loginData = req.body

        var user = await userRegister.findOne({
            username: loginData.username
        })

        if (!user)
            return res.status(401).send({
                message: 'UserName or Password invalid'
            })

        bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
            if (!isMatch)
                return res.status(401).send({
                    message: 'UserNamee or Password invalid'
                })

            createSendToken(res, user)
        })
    }
    var findIdMiddleware = function (req, res, next) {
        userRegister.findById(req.params.userId, function (err, user) {
            if (err)
                res.status(500).send(err);
            else if (user) {
                req.user = user;
                next();
            } else {
                res.status(200).send("No User Found")
            }
        });
    };

    function createSendToken(res, user) {
        var payload = {
            sub: user._id
        }

        var token = jwt.encode(payload, '123')

        res.status(200).send({
            token
        })
    }
    var auth = {
        checkAuthenticated: (req, res, next) => {
            if (!req.header('authorization'))
                return res.status(401).send({
                    message: 'Unauthorized. Missing Auth Header'
                })

            var token = req.header('authorization').split(' ')[1]

            var payload = jwt.decode(token, '123')

            if (!payload)
                return res.status(401).send({
                    message: 'Unauthorized. Auth Header Invalid'
                })

            req.userId = payload.sub

            next()
        }
    }
    return {
        post: post,
        get: get,
        login: login,
        findIdMiddleware: findIdMiddleware,
        auth: auth
    }
};

module.exports = userRegisterController;