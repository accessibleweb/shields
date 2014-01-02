var fs = require('fs');
var dot = require('dot');
var badges = require('./badges.json');
var template = fs.readFileSync('./template.svg');
var imageTemplate = dot.template(''+template);
//console.log(imageTemplate.toString())

// Construct the image sheet.
var imageSheet = './sheet.html';
var resultSheet = '';

function makeImage(name, data) {
  var result = imageTemplate(data);
  // Put this image on the sheet.
  resultSheet += result;
  // Write the image individually.
  fs.writeFileSync(name + '.svg', result);
}

function buildImages() {
  for (var name in badges) {
    makeImage(name, badges[name]);
  }
}

function main() {
  // Write the images individually.
  buildImages();
  // Write the sheet.
  fs.writeFileSync(imageSheet, resultSheet);
}

main();