var express=require("express"),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');

var db=mongoose.connect('mongodb://localhost/Library',{useMongoClient: true});

var Book=require("./model/bookModel");
var bookRouter=require('./Routes/bookRoutes')(Book);

var port=process.env.PORT || 3000;
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.listen(port,function(){
    console.log("App started Listening at "+port);
});
app.use("/api/books",bookRouter);
app.get('/',function(req,res){
    res.send("Welcome to our API");
})