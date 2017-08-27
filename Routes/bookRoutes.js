var express=require('express');

var routes=function(Book){
    bookRouter=express.Router();
    var bookController=require('../Controllers/bookController')(Book);
    bookRouter.route('/')
         .post(bookController.post)
         .get(bookController.get);
        
         bookRouter.use('/:bookId',bookController.findIdMiddleware);
         bookRouter.route('/:bookId')
         .get(function(req,res){
             var returnBook=req.book.toJSON();
             returnBook.links={};
             returnBook.links.FilterByThisGenre='http://'+req.headers.host+'/api/books/?genre='+encodeURI(returnBook.genre);
             res.json(returnBook);
         })
         .put(function(req,res){
                    book.title=req.body.title;
                    book.author=req.body.author;
                    book.genre=req.body.genre;
                    book.read=req.body.read;
                    book.save();
                    res.json(book);
         })
         .patch(function(req,res){
             if(req.body._id)
                delete req.body._id;
             for(var p in req.body)
                {
                    req.book[p]=req.body[p];
                }
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(req.book);
            });
         })
         .delete(function(req,res){
             req.book.remove(function(err){
             if(err)
                res.status(500);
             else
                res.status(204).send('Removed');
         })
        });
        
    return bookRouter;
    };
module.exports=routes;