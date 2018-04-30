var express = require('express');
var textBookRoutes = function (textBook) {
    var textBookRouter = express.Router();
    var textBookController = require('../Controllers/textBookController')(textBook);
    textBookRouter.route('/')
        .get(textBookController.getAlltextBook)
        .post(textBookController.savetextBook)
    return textBookRouter;
}
module.exports = textBookRoutes;