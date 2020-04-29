let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport');
// mongoose instance connection url connection
mongoose.connect('mongodb+srv://HaonanQuan1:Allen19971003@cluster0-fnxrh.mongodb.net/test?retryWrites=true&w=majority', {});
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(passport.initialize());

const initApp = require('./app');
initApp(app);

app.listen(port);
console.log('Order RESTful API server started on: ' + port);