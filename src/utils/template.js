'use strict';

const router = require('../router').router;
const models = require('../db').models;
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const config = require('../config');

const templatePath = path.join(__dirname, '../../static/templates');
const templateIncludePath = path.join(templatePath + '/includes/someIncludeTpl.html');

module.exports = function(templateName, data) {
  return function(cb) {
    data.filename = templateIncludePath;
    data.appDownloadUrl = config.appDownloadUrl;
    return ejs.renderFile(path.join(templatePath, templateName + '.html'), data, cb);
  };
};
