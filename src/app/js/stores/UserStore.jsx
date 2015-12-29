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
    
    onLoginWithPassword: function(username, password) {
        console.log("UserStore: loginWithPassword ["+username+"]["+password+"]");
        _.assign(this.state, {
            username:   username,
            password:   password
        });

        this.trigger(this.state);
        console.log("UserStore: after trigger");
    },
    onWs_login_with_password: function(content) {
        console.log("UserStore: ws_login_with_password");
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

    onRegister: function(username, password, email) {
        console.log("UserStore: register ["+username+"]["+password+"]["+email+"]");
        _.assign(this.state, {
            username:   username,
            password:   password,
            email:      email,
        });
        this.trigger(this.state);
        console.log("UserStore: after trigger");
    },
    
    onWs_register: function(content) {
        console.log("UserStore: ws_register");
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

