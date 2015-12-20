'use strict';

var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'loginWithPassword',
    'forgotPassword',
    'logout',
    'register'
]);

module.exports = UserActions;

