'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = exports.actions = exports.updateNotification = exports.addNotification = undefined;
exports.removeNotification = removeNotification;
exports.removeNotifications = removeNotifications;

var _helpers = require('../helpers');

var _constants = require('../constants');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// An array to store notifications object
var INITIAL_STATE = [];
// Action types
var ADD_NOTIFICATION = 'ADD_NOTIFICATION';
var UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
var REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
var REMOVE_NOTIFICATIONS = 'REMOVE_NOTIFICATIONS';

/**
 * Add a notification (thunk action creator)
 *
 * We use a thunk here to create an ADD_NOTIFICATION action
 * and only return the notification object.
 * @param {Object} notification
 * @returns {Object} notification
 */
var addNotification = exports.addNotification = function addNotification(notification) {
  return function (dispatch) {
    if (!notification.id) {
      notification.id = new Date().getTime();
    }
    notification = (0, _helpers.treatNotification)(notification);
    // if there is an image, we preload it
    // and add notification when image is loaded
    if (notification.image) {
      (0, _helpers.preloadImage)(notification.image, dispatch.bind(undefined, _addNotification(notification)));
    } else {
      dispatch(_addNotification(notification));
    }
    return notification;
  };
};

/**
 * Add a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 * @private
 */
function _addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    payload: notification
  };
}

/**
 * Update a notification (thunk action creator)
 *
 * We use a thunk here to create an UPDATE_NOTIFICATION action
 * and only return the notification object.
 * @param {Object} notification
 * @returns {Object} notification
 */
var updateNotification = exports.updateNotification = function updateNotification(notification) {
  return function (dispatch, getState) {
    if (!notification.id) {
      throw new Error('A notification must have an `id` property to be updated');
    }

    var notifications = getState().notifications;
    var index = notifications.findIndex(function (oldNotification) {
      return oldNotification.id === notification.id;
    });
    var currNotification = notifications[index];

    notification = (0, _helpers.treatNotification)(notification);

    // if image is different, then we preload it
    // and update notification when image is loaded
    if (notification.image && (!currNotification.image || currNotification.image && notification.image !== currNotification.image)) {
      (0, _helpers.preloadImage)(notification.image, dispatch.bind(undefined, _updateNotification(notification)));
    } else {
      dispatch(_updateNotification(notification));
    }
    return notification;
  };
};

/**
 * Update a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 * @private
 */
function _updateNotification(notification) {
  return {
    type: UPDATE_NOTIFICATION,
    payload: notification
  };
}

/**
 * Remove a notification (action creator)
 *
 * @param {Object} notification
 * @returns {{type: string, payload: {Object}}}
 */
function removeNotification(notification) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: notification
  };
}

/**
 * Remove all notifications (action creator)
 *
 * @returns {{type: string}}
 */
function removeNotifications() {
  return {
    type: REMOVE_NOTIFICATIONS
  };
}

// Action creators
var actions = exports.actions = {
  addNotification: addNotification,
  updateNotification: updateNotification,
  removeNotification: removeNotification,
  removeNotifications: removeNotifications
};

// Actions types
var types = exports.types = {
  ADD_NOTIFICATION: ADD_NOTIFICATION,
  UPDATE_NOTIFICATION: UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION: REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATIONS: REMOVE_NOTIFICATIONS
};

// Reducers

exports.default = function () {
  var defaultNotification = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.DEFAULT_NOTIFICATION;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
      case ADD_NOTIFICATION:
        var notification = Object.assign({}, defaultNotification, payload);
        return [].concat(_toConsumableArray(state), [notification]);
      case UPDATE_NOTIFICATION:
        return state.map(function (notification) {
          if (notification.id === payload.id) {
            return Object.assign({}, defaultNotification, payload);
          }
          return notification;
        });
      case REMOVE_NOTIFICATION:
        return state.filter(function (notification) {
          return notification.id !== payload;
        });
      case REMOVE_NOTIFICATIONS:
        return [];
      default:
        return state;
    }
  };
};