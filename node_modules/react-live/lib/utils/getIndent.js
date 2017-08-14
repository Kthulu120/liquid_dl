'use strict';

exports.__esModule = true;
var indentRegex = /^\s+/;

var getIndent = function getIndent(plain, cursorPos) {
  var startSlice = plain.slice(0, cursorPos);
  var lastNewline = startSlice.lastIndexOf('\n') + 1;
  var lineSlice = startSlice.slice(lastNewline);
  var matches = lineSlice.match(indentRegex);
  if (matches === null) {
    return '';
  }

  return matches[0] || '';
};

exports.default = getIndent;
module.exports = exports['default'];