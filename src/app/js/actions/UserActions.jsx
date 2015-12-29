'use strict';

var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'loginWithPassword',
    'loginWithEmail',
    'register',
    'logout',
    'serverClientCode',
    'serverLoginWithPassword',
    'serverRegister',
    'server'
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
    // Lose the first '/' and replace all others with '_'
    func = func.slice(1);
    func = func.replace(/\//g,'_');
    // Capitalize First Letter and prepend 'server'
    func = func.charAt(0).toUpperCase() + func.slice(1);
    func = 'server' + func;

    console.log("Userstore: func ["+func+"]");
    // Convert the route into an action
    UserActions[func](json.content); 
};

ws.onopen = function(event) {
    // Validate the clientCode
    console.log("UserActions: clientCode needs to be initialized");
    ws.send(JSON.stringify({
        "route":  "/clientCode",
        "content":  {
            "msg_id" :      "123",
            "client_code" : clientCode
        }
    }));
};

UserActions.serverClientCode.listen(function(content) {
    console.log("UserActions:ws_clientCode ["+content.client_code+"]");
    clientCode = content.client_code;
});


UserActions.loginWithPassword.listen(function(username, password) {
    console.log("UserActions:loginWithPassword");
    ws.send(JSON.stringify({
        "route":        "/loginWithPassword",
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

