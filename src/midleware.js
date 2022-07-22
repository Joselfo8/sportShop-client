const GoogleStrategy = require("passport-google-oauth20").Strategy;

//const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID ="409262768000-lru6d2l4k0f92fh0f4g5q7vevs9go5tc.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:"/google"  //"/auth/google/" //"https://sport-shop-client.vercel.app/google" //"http://localhost:4040/google"//"/google",
    },
    function (accessToken, refreshToken, profile, done/*cb*/) {
      /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      } */ 
      done(null, profile);

    }
  )
);
//
// Next estrategia de autenticación
//

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});