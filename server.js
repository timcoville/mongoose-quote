// Imports
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var flash = require('express-flash');
var session = require('express-session');


// App Settings
var app = express();
app.use(session({
    secret: "quotingdojokey"
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// Mongoose
mongoose.connect('mongodb://localhost/quoting_dojo');
var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: [3, "Name needs to be longer"]}, 
    quote: {type: String, required: [true, "No quote entered, WAT?"]}
}, {timestamps: true});
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');


// Routing
app.get('/', function(req, res){
    res.render('index')
})

app.post('/quote', function(req, res){
    console.log(req.body);
    Quote.create(req.body, function(err){
        if (err) {
            for (var key in err.errors){
                req.flash('quote', err.errors[key].message);
            }
            res.redirect('/');
        }
        
            Quote.find({}).sort('-createdAt').exec(function(err, data) {
                console.log(data)
                if (err) {console.log(err.message)};
                res.render('result', {quotes : data})

        });
    });
});

app.get('/quote', function(req, res){
    Quote.find({}).sort('-createdAt').exec(function(err, data) {
        console.log(data)
        if (err) {console.log(err.message)};
        res.render('result', {quotes : data})
    })
})

app.listen(8000, function(){
    console.log("It's working 8000");
})