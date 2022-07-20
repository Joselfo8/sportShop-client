const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const passport = require('passport');
const db = require('./db');
const User = require('./models/User');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { Router } = require('express');

const GOOGLE_CLIENT_ID = "409262768000-lru6d2l4k0f92fh0f4g5q7vevs9go5tc.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4040/auth/google/redirect"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id, name: profile.displayName }, function (err, user) {
            return cb(err, user);
        });
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Al deserealizar la información del usuario va a quedar almacenada en req.user

passport.deserializeUser(function (id, done) {
    db.users.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch(err => {
            return done(err);
        })
});

//desde aqui unavez trabaje llevar a app.js
var app = express();
//var session = require('express-session');
app.use(cookieSession({
    maxAge: 1000 * 60 * 60 * 2,
    keys: ['key_secret']//deberia process.env.cookie_secret
}));

// Inicializa Passport y recupera el estado de autenticación de la sesión.
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.send('Hello, Welcome to vlixes!');
})   //end app.

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

Router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
    res.send("<h1>Welcome to vlixes</h1> llegaste ala redirect URI");
})

app.get("/auth/google",passport.authenticate('google'),function(req,res){
    res.send(req.user.userName);
    }
    );

    app.get("/auth/logout",(req,res)=>{
        req.logout();
        req.session = null;//para que no se quede en memoria
        res.send(req.user)
        });

app.listen(4040);