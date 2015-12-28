'use strict';

var Reflux      = require('reflux');
var UserActions = require('js/actions/UserActions.jsx');
var _           = require('lodash');

var UserStore = Reflux.createStore({
    listenables: UserActions,

    init: function() {
        this.state = this.getInitialState();

        // TODO this should come from a configuration
        this.ws = new WebSocket('ws://spacebotwar.com:5000/ws/user/');
        this.ws.onmessage = this.wsOnMessage;
        this.ws.onopen = this.wsOpen;
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
    // WebSocket, generic received message router
    wsOnMessage: function (event) {
        // TODO Better error checking for valid function names
        // TODO Check for message error codes
        console.log("UserStore: message ["+event.data+"]");
        var json = JSON.parse(event.data);
        var func = json.route;
        func = 'ws' + func.replace(/\//g,'_');
        console.log("Userstore: func ["+func+"]");
        this[func](json.content);
    },
    // WebSocket welcome message
    ws_: function(data) {
        console.log("UserStore: ws_");
    },
    // WebSocket client_code message
    ws_client_code: function(data) {
        console.log("UserStore: ws_client_code");
        this.clientCode = data.client_code;
        var userStore = JSON.stringify({
            clientCode: this.clientCode
        });
        console.log("UserStore: set userStore ["+userStore+"]");
        localStorage.setItem('UserStore', userStore) 
    },

    // WebSocket connection made
    wsOpen: function(event) {
        // TODO Look at doing this with promises.
        this.state.wsState = 'CONNECTED';

        // Validate the clientCode
        var clientCode = this.state.clientCode || "bad";
        console.log("UserStore: clientCode needs to be initialized");
        this.ws.send(JSON.stringify({
            "route":  "/client_code",
            "content":  {
                "msg_id" :      "123",
                "client_code" : clientCode
            }
        }));
    },

    onLoginWithPassword: function(username, password) {
        console.log("UserStore: loginWithPassword ["+username+"]["+password+"]");
        _.assign(this.state, {
            username:   username,
            password:   password
        });
        this.ws.send(JSON.stringify({
            "route":        "/login_with_password",
            "content": {
                "client_code" :     this.state.clientCode,
                "username" :        username,
                "password" :        password
            }
        }));

        this.trigger(this.state);
        console.log("UserStore: after trigger");
    },
    onRegister: function(username, password, email) {
        console.log("UserStore: register ["+username+"]["+password+"]["+email+"]");
        _.assign(this.state, {
            username:   username,
            password:   password,
            email:      email,
            mode:       'LOGGED_IN'
        });
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

