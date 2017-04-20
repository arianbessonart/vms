const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../model/user.model');

function login(req, res) {
  const { username, password } = req.body;
  User.findOne({ username, password }, (error, user) => {
    if (!error) {
      if (user) {
        const token = jwt.sign({ userId: user._id.toString() }, 'secret-key');
        res.json({ token, user });
      } else {
        res.status(403).send('Forbbiden');
      }
    }
  });
}

function logout(req, res) {
  const { username, password } = req.body;
  User.findOne({ username, password }, (error, user) => {
    if (!error) {
      if (user) {
        const token = jwt.sign({ userId: user._id.toString() }, 'secret-key');
        res.json({ token, user });
      } else {
        res.status(403).send('Forbbiden');
      }
    }
  });
}

router.post('/login', login);
router.post('/logout', logout);
module.exports = router;
