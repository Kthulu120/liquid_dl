'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_STATUS = exports.DEFAULT_STATUS = 'default';
var INFO_STATUS = exports.INFO_STATUS = 'info';
var SUCCESS_STATUS = exports.SUCCESS_STATUS = 'success';
var WARNING_STATUS = exports.WARNING_STATUS = 'warning';
var ERROR_STATUS = exports.ERROR_STATUS = 'error';

var STATUS = exports.STATUS = {
  default: DEFAULT_STATUS,
  info: INFO_STATUS,
  success: SUCCESS_STATUS,
  warning: WARNING_STATUS,
  error: ERROR_STATUS
};

var TOP = exports.TOP = 't';
var TOP_CENTER = exports.TOP_CENTER = 'tc';
var TOP_LEFT_POSITION = exports.TOP_LEFT_POSITION = 'tl';
var TOP_RIGHT_POSITION = exports.TOP_RIGHT_POSITION = 'tr';
var BOTTOM = exports.BOTTOM = 'b';
var BOTTOM_CENTER = exports.BOTTOM_CENTER = 'bc';
var BOTTOM_LEFT_POSITION = exports.BOTTOM_LEFT_POSITION = 'bl';
var BOTTOM_RIGHT_POSITION = exports.BOTTOM_RIGHT_POSITION = 'br';

var POSITIONS = exports.POSITIONS = {
  top: TOP,
  topCenter: TOP_CENTER,
  topLeft: TOP_LEFT_POSITION,
  topRight: TOP_RIGHT_POSITION,
  bottom: BOTTOM,
  bottomCenter: BOTTOM_CENTER,
  bottomLeft: BOTTOM_LEFT_POSITION,
  bottomRight: BOTTOM_RIGHT_POSITION
};

// default value for notifications
var DEFAULT_NOTIFICATION = exports.DEFAULT_NOTIFICATION = {
  status: DEFAULT_STATUS,
  position: TOP_RIGHT_POSITION,
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false,
  closeButton: false
};