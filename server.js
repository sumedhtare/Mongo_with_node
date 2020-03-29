var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
   routes = require('./routes');
//    Task = mongoose.model('Tasks');

   
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/addressbook'); 
const db = mongoose.connection;
var Schema = mongoose.Schema;


var BookSchema = new Schema({
    name:String,
    number: Number,
    date: Date
})

var Book = mongoose.model('Contactlist', BookSchema);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

 app.get('/',routes.index);

app.get('/add',function(req,res){
    res.send("its working") 
})

app.post('/view',function(req,res){
    var name = req.query.name;
    var number = req.query.number;
    var date = new Date();
    var book1 = new Book({ name,number,date });
    book1.save(function (err, book) {
        if (err) return console.error(err);
        console.log(book.name + " saved to bookstore collection.");
      });
      
    res.send({data: "its working",
name:name,number}) 
})


app.post('/find',function(req,res){
   var name = req.query.name

   Book.find({name},function(err,data){
       if (err)
    console.error(err);
    else{
        res.send({data}) 
    }
   });
   
})

 app.listen(port);
console.log('server started at:' + port);