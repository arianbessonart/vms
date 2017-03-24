const express = require('express');
const router = express.Router();
const passport = require('passport');
// const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const Strategy = require('passport-local').Strategy;

const User = require('../model/user.model');

function init() {
  passport.use(new Strategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }));
}

function find(req, res) {
  User.find({}, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    }
  });
}

function findById(req, res) {
  User.findById(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    }
  });
}

// function login(req, res) {
//   return passport.authenticate('local', {}, (err, user) => {
//     if (err || !user) {
//       res.status(403).send('invalid');
//     } else {
//       User.findById(req.params.id, (error, data) => {
//         if (!error) {
//           const token = jwt.sign({ userId: user._id.toString() }, 'secret-key');
//           res.json({ token, user });
//           res.status(200).send(data);
//         }
//       });
//     }
//   });
// }

router.get('/', find);
router.get('/:id', findById);
// router.post('/login', login);

module.exports = {
  router,
  init,
};


/*
// login and if success get Account data
exports.login = function ( req, res, next ) {

  passport.authenticate ( 'local', { session : false }, function ( err, user, info ) {

    if ( err || ! user ) {

      res.status ( responseCodes.INVALID_CREDENTIALS.code ).send(responseCodes.INVALID_CREDENTIALS.message);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      UserSrv.findOne({ _id : user._id }, { populate: ['store', 'stores']}).then(function(user){
          if ( user.forceLogin ) {
            user.forceLogin = false;
            user.save ();
          }
          user.password = undefined;
          user.salt = undefined;
          var token = jwt.sign ( {userId : user._id.toString()}, config.jwt.secretKey );

          res.json ( { token : token, user : user } );
        }).catch(function(err) {
         res.status(responseCodes.SERVER_ERROR.code).send(err);
        });
    }
  } ) ( req, res, next );
}

*/
