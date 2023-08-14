// Configuración de Passport para autenticación local
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');  // Arrastra a un usuario como modelo constante


//  Serializa al usuario para almacenar en la sesión
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializa al usuario para obtener detalles de la sesión
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);   // El ID del usuario almacenado en la sesión.
    done(null, user);
});

// Autenticación local para registro de usuario
passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (user) {
        return done(null, false, req.flash('signupMsg', 'Email is already taken')); // Correo ya registrado
    } else {
        const newUser = new User(); // Nuevo objeto usuario
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);  // Encriptación del string de contraseña
        await newUser.save();
        done(null, newUser);
    }
}));

// Estrategia de autenticación local para inicio de sesión de usuario
passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signinMsg', 'User not found'));     // Mensaje de credenciales invalidas
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMsg', 'Incorrect password')); // Mensaje de contraseña incorrecta
    }
    done(null, user);
}));

// Los mensajes que se muestran en las lineas 44 y 47 se retornan y se muestran en el los archivos .ejs en la carpeta views
// Puedes reemplazarlo por algún ALERT o yo que sé, ahí tu le mueves. Cualquier pregunta me dices.