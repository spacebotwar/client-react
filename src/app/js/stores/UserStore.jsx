'use strict';

var Reflux      = require('reflux');
var UserActions = require('../actions/UserActions');


var UserStore = Reflux.createStore({
    listenables: [UserActions],

    init: function() {
        this.user = this.getInitialState();
    },
    getInitialState: function() {
        return {
            state:      'NOT_LOGGED_IN',
            username:   '',
            email:      '',
            password:   ''
        };
    },
    loginWithPassword: function(username, password) {
        console.log("UserStore: loginWithPassword");
        this.user.username = username;
        this.user.password = password;
        if (username == 'icy' && password == 'secret') {
            this.user.state = 'LOGGED_IN';
        }
        this.trigger(this.user);
        console.log("UserStore: after trigger");
    },
    logout: function() {
        console.log("UserStore: logout");
        this.init();
        this.trigger(this.user);
    },
    register: function() {
        console.log("UserStore: register");

    },
    forgotPassword: function() {
        console.log("UserStore: forgotPassword");
        this.user.state = 'NOT_LOGGED_IN';
        this.trigger(this.user);
    },

});

module.exports = UserStore;

