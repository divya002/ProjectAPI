var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var routes = function (userRegister) {
    userRegisterRouter = express.Router();
    var userRegisterController = require('../Controllers/userRegisterController')(userRegister);
    userRegisterRouter.route('/')
        .post(userRegisterController.post)
        .get(userRegisterController.get);
    userRegisterRouter.route('/login')
        .post(userRegisterController.login);
    userRegisterRouter.route('/checkusername')
        .post(userRegisterController.checkUserAvailability);
    userRegisterRouter.route('/checkemail')
        .post(userRegisterController.checkEmailAvailability);
    userRegisterRouter.route('/login/forgetpassword')
        .post(function (req, res) {
            var query = {};
            if (req.body.email) {
                query.email = req.body.email;
                userRegister.find(query, function (err, user) {
                    if (err) {
                        res.status(500).send(err);
                        alert("err");
                    } else {
                        if (user[0].username) {
                            res.json(user[0].password);
                        } else {
                            res.send("UserNotAvailable");
                        }
                    }
                })
            }

        });
    userRegisterRouter.use('/:userId', userRegisterController.findIdMiddleware);
    userRegisterRouter.route('/:userId')
        .get(function (req, res) {
            var returnUser = req.user.toJSON();
            returnUser.links = {};
            returnUser.links.FilterByThisStream = 'http://' + req.headers.host + '/api/users/?stream=' + encodeURI(returnUser.stream);
            res.json(returnUser);
        })
        .put(function (req, res) {
            var user = {};
            req.user.name = req.body.title;
            req.user.stream = req.body.stream;
            req.user.class = req.body.class;
            req.user.previousGrade = req.body.previousGrade;
            req.user.college = req.body.college;
            req.user.board = req.body.board;
            req.user.mobile = req.body.mobile;
            req.user.email = req.body.email;
            req.user.username = req.body.username;
            req.user.password = req.body.password;
            req.user.repassword = req.body.repassword;
            req.user.type = req.body.type;
            req.user.save();
            res.json(req.user);
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;
            for (var p in req.body) {
                req.user[p] = req.body[p];
            }
            req.user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.user);
            });
        })
        .delete(function (req, res) {
            req.user.remove(function (err) {
                if (err)
                    res.status(500);
                else
                    res.status(204).send('Removed');
            })
        });
    return userRegisterRouter;
};
module.exports = routes;