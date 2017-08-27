var bookController=function(Book){
    var get =function(req,res){
        query={};
        if(req.query.genre)
            {
                query.genre=req.query.genre;
            }
        Book.find(query,function(err,books){
            if(err)
                res.status(500).send(err);
            else
                {
                    var returnBooks=[];
                    books.forEach(function(element){
                    var newBook=element.toJSON();
                    newBook.links={};
                    newBook.links.self='http://'+req.headers.host+'/api/books/'+newBook._id;
                    newBook.links.Reference="divyaprakash002@gmail.com"
                    returnBooks.push(newBook);
                    });
                    res.json(returnBooks);
                }
        })
     };
var post=function(req,res){
    var book=new Book(req.body);
    book.save();
    res.status(201).send(book);
};
var findIdMiddleware=function(req,res,next){
    Book.findById(req.params.bookId,function(err,book){
        if(err)
            res.status(500).send(err);
        else if(book)
            {
            req.book=book;
            next();
            }
        else
            {
                res.status(200).send("No BooK Found")
            }
 });
};
return {
    post:post,
    get:get,
    findIdMiddleware:findIdMiddleware
}
};

module.exports=bookController;