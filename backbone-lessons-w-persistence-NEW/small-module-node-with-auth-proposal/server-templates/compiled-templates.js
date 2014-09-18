var fs = require('fs');
var _ = require('underscore');
var path = require('path');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
var compiledTemplates = {};

var templatesPath = path.join(__dirname, 'templates');
var files = fs.readdirSync(templatesPath);
files.forEach(function(item){
  var templateName = path.basename(item, '.html');
  var templatePath = path.join(templatesPath, item)
  var template = fs.readFileSync(templatePath, {encoding: 'utf8'});
  compiledTemplates[templateName] = _.template(template);
});

module.exports = compiledTemplates;