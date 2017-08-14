'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNotifications = exports.removeNotification = exports.updateNotification = exports.addNotification = exports.reducer = exports.types = exports.actions = exports.POSITIONS = exports.STATUS = exports.DEFAULT_NOTIFICATION = undefined;

var _NotificationsSystem = require('./components/NotificationsSystem');

var _NotificationsSystem2 = _interopRequireDefault(_NotificationsSystem);

var _constants = require('./constants');

var _notifications = require('./store/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DEFAULT_NOTIFICATION = _constants.DEFAULT_NOTIFICATION;
exports.STATUS = _constants.STATUS;
exports.POSITIONS = _constants.POSITIONS;
exports.actions = _notifications.actions;
exports.types = _notifications.types;
exports.reducer = _notifications2.default;
exports.addNotification = _notifications.addNotification;
exports.updateNotification = _notifications.updateNotification;
exports.removeNotification = _notifications.removeNotification;
exports.removeNotifications = _notifications.removeNotifications;
// NotificationsSystem React component

exports.default = _NotificationsSystem2.default;