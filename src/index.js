const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const express = require('express');
const engine = require('ejs-mate');
const morgan = require('morgan');
const path = require('path');
const app = express();

require('./database');
require('./passport/local-auth');

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'bobtoronja123',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMsg = req.flash('signupMsg');
    app.locals.signinMsg = req.flash('signinMsg');
    app.locals.user = req.user;
    next();
});

app.use('/', require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});