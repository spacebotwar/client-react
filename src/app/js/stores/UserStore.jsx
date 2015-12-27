'use strict';

var Reflux      = require('reflux');
var UserActions = require('js/actions/UserActions.jsx');
var _           = require('lodash');

var UserStore = Reflux.createStore({
    listenables: UserActions,

    init: function() {
        this.state = this.getInitialState();

        this.ws = new WebSocket('ws://spacebotwar.com:5000/ws/user/');
        this.ws.onmessage = this.wsOnMessage;
        this.ws.onopen = this.wsOpen;
    },

    wsOnMessage: function (event) {
        console.log("UserStore: message ["+event.data+"]");
        var json = JSON.parse(event.data);
        var func = json.route;
        func = 'ws' + func.replace(/\//g,'_');
        console.log("Userstore: func ["+func+"]");
        this[func](json.content);
    },

    ws_: function(data) {
        console.log("UserStore: ws_");
    },
    ws_client_code: function(data) {
        console.log("UserStore: ws_client_code");
        this.clientCode = data.client_code;
        var userStore = JSON.stringify({
            clientCode: this.clientCode
        });
        console.log("UserStore: set userStore ["+userStore+"]");
        localStorage.setItem('UserStore', userStore) 
    },

    // TODO Look at doing this with promises.
    wsOpen: function(event) {
        this.state.wsState = 'NOT_CONNECTED';
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
        if (username == 'icy' && password == 'secret') {
            console.log("UserStore: correct password");
            this.state.mode = 'LOGGED_IN';
        }
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

