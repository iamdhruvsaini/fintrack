// src/config/passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const models = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({
        where: { email },
        include: [{ model: models.Role, as: "role" }],
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          return bcrypt.compare(password, user.password_hash).then((isMatch) => {
            if (!isMatch) {
              return done(null, false, { message: "Invalid credentials" });
            }

            return done(null, user);
          });
        })
        .catch((err) => done(err));
    }
  )
);

// session support (optional)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findByPk(id, {
    include: [{ model: models.Role, as: "role" }],
  })
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

module.exports = passport;