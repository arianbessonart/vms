var PDFDocument = require("pdfkit");
var moment = require('moment');

function generatePdf(invoice) {
  var doc = new PDFDocument();
  doc.y = 300;
  doc.text("contenido2", 50, 50);
  return doc;
}

function generateFileName(invoice) {
  return invoice.client.name + "-" + invoice.name + "-" + invoice.number;
}


module.exports = {
  generateFileName,
  generatePdf,
};
