'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertStatus = convertStatus;
exports.Timer = Timer;
exports.treatNotification = treatNotification;
exports.preloadImage = preloadImage;
exports.mapObjectValues = mapObjectValues;

var _constants = require('../constants');

/**
 * Convert status in a understandable status for the Notification component
 * @param {String|Number} status
 * @returns {String} status an understandable status
 */
function convertStatus(status) {
  var reHttpStatusCode = /^\d{3}$/;
  // convert HTTP status code
  if (reHttpStatusCode.test(status)) {
    switch (true) {
      case /^1/.test(status):
        return _constants.STATUS.info;
      case /^2/.test(status):
        return _constants.STATUS.success;
      case /^(4|5)/.test(status):
        return _constants.STATUS.error;
    }
  }
  return status;
}

/**
 * Create a Timer
 * @param {Number} delay
 * @param {Function} callback
 * @constructor
 */
function Timer(delay, callback) {
  var timerId = void 0;
  var start = void 0;
  var remaining = delay;

  this.pause = function () {
    clearTimeout(timerId);
    remaining -= new Date() - start;
  };
  this.resume = function () {
    start = new Date();
    clearTimeout(timerId);
    timerId = setTimeout(callback, remaining);
  };

  this.getTimeRemaining = function () {
    return remaining;
  };
}

/**
 * Treat data of a notification
 * @param {Object} notification
 * @returns {Object} a notification
 */
function treatNotification(notification) {
  if (notification.dismissAfter) {
    notification.dismissAfter = parseInt(notification.dismissAfter);
  }
  if (notification.image) {
    notification.status = _constants.STATUS.default;
  } else {
    notification.status = convertStatus(notification.status);
  }
  if (!notification.buttons) {
    notification.buttons = [];
  }
  return notification;
}

/**
 * Preload an image
 * @param {String} url url of image to load
 * @param {Function} cb Function called when image is loaded or not
 * @returns {void}
 */
function preloadImage(url, cb) {
  var image = new Image();
  image.src = url;
  image.onload = cb;
  image.onerror = cb;
  return image;
}

/**
 * Return values of an Object in an Array
 * @param {Object} obj
 * @returns {Array}
 */
function mapObjectValues(obj) {
  var array = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      array.push(obj[key]);
    }
  }
  return array;
}