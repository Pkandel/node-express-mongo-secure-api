import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';

//Register an user
function signup(req, res) {
  const { email, password } = req.body;
  let user;
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (user) {
      res.send({ success: false, message: "User already exists" });
    }
    else {
      user = new User({
        email: email,
        password: password
      });
      user.save(err => {
        if (err) throw err;
        user.password = undefined
        const token = jwt.sign(user, config.jwt_secret, {
          expiresIn: 1440 //24 hours
        });
        return res.status(200).json({
          success: true,
          data: {
            token: token
          },
          message: "Please use this token to access the data in our api",
        });
      });
    }
  });
}

//Authenticate an user
function login(req, res) {
  //if no user name or password provided
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({
      success: false,
      message: 'username or password missing'
    })
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed, user not found'
      })
    }
    else if (user) {
      //check if password match
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          user.password = undefined
          const token = jwt.sign(user, config.jwt_secret, {
            expiresIn: 1440 //24 hours
          });
          return res.status(200).json({
            success: true,
            data: {
              token: token
            },
            message: "Please use this token to access the data in our api",
          });
        } else {
          return res.status(401).json({
            success: false,
            message: 'Authentication failed, password not match'
          })
        }
      });
    }

  })
}

export { signup, login }
