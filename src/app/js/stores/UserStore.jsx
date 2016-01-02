'use strict';

var Reflux      = require('reflux');
var UserActions = require('js/actions/UserActions.jsx');
var _           = require('lodash');

var UserStore = Reflux.createStore({
    listenables: UserActions,

    init: function() {
        this.state = this.getInitialState();
    },

    getInitialState: function() {
        var userStore = JSON.parse(localStorage.getItem('UserStore') || '{}');

        return {
            mode:           'NOT_LOGGED_IN',
            username:       '',
            email:          '',
            password:       '',
            clientCode:     userStore.clientCode,
            wsState:        'NOT_CONNECTED'
        };
    },

    // actions caused by server Web Socket messages.

    onServerLoginWithPassword: function(content) {
        console.log("UserStore: onServerLoginWithPassword");
        if (content.code === 0) {
            console.log("UserStore: Success "+content.message);
            _.assign(this.state, {
                mode:   'LOGGED_IN'
            });
        }
        else {
            console.log("UserStore: ERROR "+content.message);
        }
    },

    onServerRegister: function(content) {
        console.log("UserStore: onServerRegister");
        if (content.code === 0) {
            console.log("UserStore: Success "+content.message);
            _.assign(this.state, {
                mode:   'LOGGED_IN'
            });
        }
        else {
            console.log("UserStore: ERROR"+content.message);
        }
        this.trigger(this.state);
    },

    onLogout: function() {
        console.log("UserStore: logout");
        this.state = this.getInitialState();
        this.trigger(this.state);
    },
});

module.exports = UserStore;

