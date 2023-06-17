const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const { pool } = require("./database");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/secrets",
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log(profile.id);
      pool.query(
        "SELECT * FROM users WHERE googleid=$1",
        [profile.id],
        (err, results) => {
          if (results.rows.length === 0) {
            pool.query(
              "INSERT INTO users(googleid,email) VALUES($1,$2)",
              [profile.id, profile.email],
              (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("success");
                }
              }
            );
          } else {
            console.log("User exists");
          }
          return done(err, profile);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
