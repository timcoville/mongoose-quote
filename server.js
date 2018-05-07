var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

mongoose.connect('mongodb://localhost/quoting_dojo');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4}, 
    quote: {type: String, required: true}
}, {timestamps: true});

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.get ('/', function(req, res){
    res.render('index')
})

app.post ('/quote', function(req, res){
    console.log(req.body);
    res.render('index')
})

app.get('/quote', function(req, res){
    console.log('quote get req');
    res.render('index')
})
app.listen(8000, function(){
    console.log("It's working 8000");
})