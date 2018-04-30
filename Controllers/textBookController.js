var textBookController = function (textBook) {
    var getAlltextBook = function (req, res) {
        var query = {};
        if (req.query) {
            query = req.query;
        }
        textBook.find(query, function (err, textbooks) {
            if (err) {
                res.status(500).send(err);
            }
            res.json(textbooks);
        })

    };
    var savetextBook = function (req, res) {
        if (req.body.bookName!= null) {
            var textbook = new textBook(req.body);
            textbook.save();
            res.status(201).send(textbook);
        } else {
            res.send("Null Value Passed");
        }
    };
    return {
        getAlltextBook: getAlltextBook,
        savetextBook: savetextBook
    }

};
module.exports = textBookController;