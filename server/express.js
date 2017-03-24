const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const serverConfig = require('./config');
const User = require('./model/user.model');
const clients = require('./controllers/client');
const invoices = require('./controllers/invoice');
const auth = require('./controllers/auth');


mongoose.connect(serverConfig.dbUrl, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});


function initPassport() {
  passport.use(new Strategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.authenticate(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }));
}

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  initPassport();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      // req.populate = req.query.expand ? req.query.expand.split(',') : [];
      // req.limit = parseInt(req.query.limit || 0);
      // req.offset = parseInt(req.query.offset || 0);
      // delete req.query.expand;
      // delete req.query.limit;
      // delete req.query.offset;
      next();
    }
  });

  app.get('lala', function(req, res) {
    console.log('adentroooooooo');
  });
  app.route('/api/v1/auth', auth.router);
  app.route('/api/v1/clients', clients);
  app.route('/api/v1/invoices', invoices);
  return app;
};
