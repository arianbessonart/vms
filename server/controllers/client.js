
var express = require('express');
var router = express.Router();

var Client = require('../model/client.model');


function find(req, res, next) {
  Client.find({}, function(err, data) {
    if (!err) {
      res.status(200).send(data);
    }
  });
}

function findById(req, res, next) {
  Client.findById(req.params.id, function(err, data) {
    if (!err) {
      res.status(200).send(data);
    }
  });
}

function create(req, res, next) {
  res.status(200).send("{}");
}

router.get('/', find);
router.get('/:id', findById);
router.post('/', create);

module.exports = router;
