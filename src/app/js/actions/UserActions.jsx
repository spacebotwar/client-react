'use strict';

var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'loginWithPassword',
    'loginWithEmail',
    'register',
    'logout',
]);

module.exports = UserActions;

