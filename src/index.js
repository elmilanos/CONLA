// Importación módulos
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const express = require('express');
const engine = require('ejs-mate');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Configuración de la base de datos y autenticación local
require('./database');
require('./passport/local-auth');

// Configuración de la ubicación de las vistas --> /views
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// Configuración de registros con Morgan
app.use(morgan('dev'));

// Middleware para manejar los datos del formulario
app.use(express.urlencoded({extended: false}));

// Configuración de la sesión de Express
app.use(session({
    secret: 'bobtoronja123',
    resave: false,
    saveUninitialized: false
}));

// Middleware para mensajes temporales
app.use(flash());

// Configuración de Passport para la autenticación
app.use(passport.initialize());
app.use(passport.session());

// Middleware para variables globales en /views
app.use((req, res, next) => {
    app.locals.signupMsg = req.flash('signupMsg');
    app.locals.signinMsg = req.flash('signinMsg');
    app.locals.user = req.user;
    next();
});

// Rutas principales --> /routes
app.use('/', require('./routes/index'));

// Iniciar el servidor --- ir a keys.js -> database.js
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
