'use strict';

exports.__esModule = true;

var _prismCore = require('prismjs/components/prism-core');

require('prismjs/components/prism-clike');

require('prismjs/components/prism-javascript');

require('prismjs/components/prism-markup');

require('prismjs/components/prism-jsx');

var prism = function prism(code) {
  return (0, _prismCore.highlight)(code, _prismCore.languages.jsx);
};

exports.default = prism;
module.exports = exports['default'];