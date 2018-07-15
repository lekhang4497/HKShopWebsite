var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var paginateHelper = require('express-handlebars-paginate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
const fileUpload = require('express-fileupload');

var index = require('./routes/index');
var product = require('./routes/product');
var user = require('./routes/user');
var payment = require('./routes/payment');
var vnPayment = require('./routes/vn-payment');
var cart = require('./routes/cart');
var order = require('./routes/order');
var admin = require('./routes/admin');
var api = require('./routes/api');
var design = require('./routes/design');

var app = express();

mongoose.connect('<Enter your mongodb connection string>');
require('./config/passport');

var hbs = exphbs.create({ /* config */ });
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: "views/partials/"

}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    if (req.isAuthenticated() && req.user.role === 'Admin'){
        res.locals.admin = true;
    }
    next();
})

app.use('/product', product);
app.use('/user', user);
app.use('/payment', payment);
app.use('/vn-payment', vnPayment);
app.use('/cart', cart);
app.use('/order', order);
app.use('/admin', admin);
app.use('/design', design);
app.use('/api', api);
app.use('/', index);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('HKShop server listening on: ' + PORT);
});