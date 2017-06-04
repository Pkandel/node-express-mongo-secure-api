import Jwt from 'passport-jwt';
const JwtStrategy = Jwt.Strategy;
const secret = process.env.JWT_SECRET;

// Load user Model
const User = require('../models').User;

module.exports = function(passport){
  let opts = {};
  opts.secretOrKey = secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};

