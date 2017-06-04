import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  id: {
  type: Number
  },
  name: {
    type: String
  },
  email: {
    type:String,
  },
  password: {
    type: String,
  }
});

UserSchema.plugin(AutoIncrement, {inc_field: 'id'});


UserSchema.pre('save',function(next){
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('user', UserSchema);
