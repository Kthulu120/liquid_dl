'use strict';

exports.__esModule = true;
var normalizeCode = function normalizeCode(code) {
  return code.replace(/^((  )+)/mg, function (_, p1) {
    return '\t'.repeat(p1.length / 2);
  });
};

exports.default = normalizeCode;
module.exports = exports['default'];