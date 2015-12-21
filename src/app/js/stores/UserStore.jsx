'use strict';

var Reflux      = require('reflux');
var UserActions = require('../actions/UserActions');


var UserStore = Reflux.createStore({
    listenables: UserActions,

    init: function() {
        this.state = this.getInitialState();
    },

    getInitialState: function() {
        return {
            mode:      'NOT_LOGGED_IN',
            username:   '',
            email:      '',
            password:   ''
        };
    },
    onLoginWithPassword: function(username, password) {
        console.log("UserStore: loginWithPassword ["+username+"]["+password+"]");
        this.state.username = username;
        this.state.password = password;
        if (username == 'icy' && password == 'secret') {
            console.log("UserStore: correct password");
            this.state.mode = 'LOGGED_IN';
        }
        this.trigger(this.state);
        console.log("UserStore: after trigger");
    },
    onRegister: function(username, password, email) {
        console.log("UserStore: register ["+username+"]["+password+"]["+email+"]");
        this.state.username = username;
        this.state.password = password;
        this.state.email    = email;
        this.state.mode     = 'LOGGED_IN';
        this.trigger(this.state);
        console.log("UserStore: after trigger");
    },
    onLogout: function() {
        console.log("UserStore: logout");
        this.state = this.getInitialState();
        this.trigger(this.state);
    },
});

module.exports = UserStore;

