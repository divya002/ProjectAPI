var moongoose = require("mongoose"),
    Schema = moongoose.Schema;

var textBookModel = new Schema({
    bookType: {
        type: String
    },
    bookforStandard: {
        type: String
    },
    universityFor: {
        type: String
    },
    bookName: {
        type: String
    },
    bookAuthor: {
        type: String
    },
    bookPublisher: {
        type: String
    },
    bookSubject: {
        type: String
    },
    bookForYear: {
        type: Number
    },
    bookLocation: {
        type: String
    },
    bookCoverLocation: {
        type: String
    }
});
module.exports=moongoose.model('textBook',textBookModel);