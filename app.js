var express = require("express"),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jwt-simple');
var db = mongoose.connect('mongodb://divya:divya@ds239965.mlab.com:39965/studyq', {
    useMongoClient: true
}, (err) => {
    if (!err)
        console.log("MongoDB DataBase Connected");
});
var userRegister = require("./model/userRegisterModel");
var textBook = require("./model/textBookModel");
var userRegisterRouter = require('./Routes/userRegisterRoutes')(userRegister);
var textBookRouter = require('./Routes/textBookRoutes')(textBook);
mongoose.Promise = Promise

var port = process.env.PORT || 3000;
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.listen(port, function () {
    console.log("App started Listening at " + port);
});
app.use("/api/users", userRegisterRouter);
app.use("/api/textbook", textBookRouter);
app.get('/', function (req, res) {
    res.send("Welcome to our API");
})