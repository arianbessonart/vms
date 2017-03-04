var PDFDocument = require("pdfkit");
var moment = require('moment');

function generatePdf(invoice) {
  var doc = new PDFDocument();
  doc.y = 300;
  doc.text("contenido2", 50, 50);
  return doc;
}

function generateFileName(invoice) {
  console.log(invoice.client.name);
  console.log(invoice.name);
  console.log(invoice.date);
  return invoice.client.name + "-" + invoice.name + "-" + invoice.number;
}


module.exports = {
  generateFileName: generateFileName,
  generatePdf: generatePdf
};
