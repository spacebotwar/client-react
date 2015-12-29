'use strict';

var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'loginWithPassword',
    'loginWithEmail',
    'register',
    'logout',
    'ws_client_code',
    'ws_login_with_password',
    'ws_register',
    'ws_'
]);

// TODO this should come from a configuration
var ws = new WebSocket('ws://spacebotwar.com:5000/ws/user/');
var clientCode = 'bad';

ws.onmessage = function() {
    // TODO Better error checking for valid function names
    // TODO Check for message error codes
    console.log("UserActions: message ["+event.data+"]");
    var json = JSON.parse(event.data);
    var func = json.route;
    func = 'ws' + func.replace(/\//g,'_');
    console.log("Userstore: func ["+func+"]");
    // Convert the route into an action
    UserActions[func](json.content); 
};

ws.onopen = function(event) {
    // Validate the clientCode
    console.log("UserActions: clientCode needs to be initialized");
    ws.send(JSON.stringify({
        "route":  "/client_code",
        "content":  {
            "msg_id" :      "123",
            "client_code" : clientCode
        }
    }));
};

UserActions.ws_client_code.listen(function(content) {
    console.log("UserActions:ws_client_code ["+content.client_code+"]");
    clientCode = content.client_code;
});


UserActions.loginWithPassword.listen(function(username, password) {
    console.log("UserActions:loginWithPassword");
    ws.send(JSON.stringify({
        "route":        "/login_with_password",
        "content": {
            "client_code" :     clientCode,
            "username" :        username,
            "password" :        password
        }
    }));
});

UserActions.register.listen(function(username, password, email) {
    console.log("UserActions:register");
    ws.send(JSON.stringify({
        "route":        "/register",
        "content": {
            "client_code":  clientCode,
            "username":     username,
            "password":     password,
            "email":        email
        }
    }));
});


module.exports = UserActions;

