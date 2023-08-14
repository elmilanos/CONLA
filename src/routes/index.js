//      En esta parte del proyecto se encuentran todos los accesos a las rutas.
//      Las rutas se encuentran organizadas por categoría. Por arriba te dejo el proposito de cada una y
//      la información del funcionamiento de cada linea en especifico para que la cales.
//      Lo más importante del script son las redirecciones las cuales mandan a las paginas en especifico
//      que se les mostraran al usuario

//      ------------------------------------------------------------------------------------------------
//      req  -  El objeto de solicitud que contiene la información de la solicitud entrante.
//      res  -  El objeto de respuesta que se utilizará para enviar una respuesta al cliente.
//      next -  Una función que se utiliza para pasar la solicitud al siguiente middleware o ruta.
//      ------------------------------------------------------------------------------------------------
//      Esto que te puse arriba es más que nada el como funciona los metodos que se ven en esta parte
//      de script. Espero que le entiendas aunque pues la neta es más de moverle para entenderle, o al
//      chile no sé como le haces tu para aprender tecnologías nuevas.

const passport = require('passport');
const express = require('express');
const router = express.Router();

// Muestra la página principal
router.get('/', (req, res, next) => {
    res.render('index');
});

// Muestra la página de registro
router.get('/signup', (req, res, next) => {
    res.render('signup');
});


// Maneja la solicitud de registro de usuario
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',           // Redirige al inicio en caso de éxito.
    failureRedirect: '/signup',     // Redirige al registro en caso de fallo.
    passReqToCallback: true         // Pasa la solicitud a la función de autenticación.
}));

// Muestra la página del inicio de sesión
router.get('/signin', (req, res, next) => {
    res.render('signin');
});

// Maneja la información del inicio de sesión
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',    // Redirige al perfil en caso de éxito.
    failureRedirect: '/signin',     // Redirige al inicio de sesión en caso de fallo.
    passReqToCallback: true         // Pasa la solicitud a la función de autenticación.
}));

// Cierre de sesión
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

// Muestra la página de perfil de usuario
// Comprueba si el usuario está autenticado antes de mostrar el perfil
//                         ↓↓↓↓↓↓
router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile');
});

// Middleware para comprobar la autenticación del usuario
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { // Autenticación del usuario
        return next();
    }
    res.redirect('/'); // Recarga la página en caso de haber error de autenticación
}

// Exporta las rutas configuradas :)
module.exports = router;
