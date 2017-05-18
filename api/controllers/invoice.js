var express = require('express');
var _ = require('lodash');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var pdfUtil = require('../util/pdf');
var Invoice = require('../model/invoice.model');


function find(req, res) {
  const pagination = _.pick(req, ['page', 'limit']);
  const filter = _.merge(req.query, req.q ? { name: new RegExp(req.q, 'i') } : {});
  const options = _.merge(pagination, { populate: ['client'], sort: { date: -1 } });
  Invoice.paginate(filter, options).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  });
}

function findById(req, res, next) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if (!err) {
      res.status(200).send(invoice);
    } else {
      res.status(500).send(err);
    }
  });
}

function create(req, res, next) {
  if (!req.body.name || !req.body.number || !req.body.date) {
    res.status(403).end();
  }
  var invoice = new Invoice(req.body);
  invoice.save(function (err, saved) {
    if (!err) {
      res.status(200).send({invoice: saved});
    } else {
      res.status(500).send(err);
    }
  });
}

function changeStatus(req, res, next) {
  if (req.params.status === "charged" && !req.body.date) {
    res.status(403).end();
  }
  Invoice.findById(req.params.id, function (err, invoice) {
    if (!err) {
      invoice.status = req.params.status;
      invoice.dateBilled = req.body.date;
      invoice.save(function (err, saved) {
        if (!err) {
          res.status(200).send({invoice: saved});
        }
      });
    } else {
      res.status(500).send(err);
    }
  });
}

function update(req, res, next) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if (!err) {
      invoice.update(req.body, function (err, saved) {
        if (!err) {
          res.status(200).send({invoice: saved});
        }
      });
    } else {
      res.status(500).send(err);
    }
  });
}

function printPdf(req, res, next) {
  if (!req.params.id) {
    res.status(403).end();
  }
  Invoice.find({ _id: ObjectId(req.params.id)})
    .populate('client')
    .exec(function(err, data) {
      if (!err && data.length > 0) {
        var invoice = data[0];
        var filename = pdfUtil.generateFileName(invoice);
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        var doc = pdfUtil.generatePdf(invoice);
        doc.pipe(res);
        doc.end();
      }
    });
}

function deleteInvoice(req, res, next) {
  Invoice.remove({ _id: req.params.id}, function (err) {
    if (!err) {
      res.status(200).send({});
    } else {
      res.status(500).send(err);
    }
  });
}

router.get('/', find);
router.get('/:id/print', printPdf);
router.get('/:id', findById);
router.post('/', create);
router.put('/:id/status/:status', changeStatus);
router.put('/:id', update);
router.delete('/:id', deleteInvoice);

module.exports = router;
