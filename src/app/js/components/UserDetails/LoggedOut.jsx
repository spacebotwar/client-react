'use strict';

var React           = require('react');
var Reflux          = require('reflux');
var LogInForm       = require('./LoggedOut/LogInForm');
var RegisterForm    = require('./LoggedOut/RegisterForm');
var UserActions     = require('js/actions/UserActions');

var LoggedOut = React.createClass({
    getInitialState: function() {
        return {
            mode:   'LOG_IN_FORM'
        };
    },

    eventClickRegister: function(event) {
        console.log("LoggedOut: eventClickRegister");
        event.preventDefault();
        this.setState({mode: 'REGISTER_FORM'});
    },

    eventSubmitLogin: function(event, username, password) {
        console.log("LoggedOut: eventLogin");
        UserActions.loginWithPassword(username, password);
    },

    eventSubmitRegister: function(event, username, password, email) {
        console.log("LoggedOut: eventRegister");
        UserActions.register(username, password, email);
    },

    eventClickRegisterCancel: function(event) {
        console.log("LoggedOut: render");
        event.preventDefault();
        this.setState({mode: 'LOG_IN_FORM'});
    },

    render: function() {
        console.log("LoggedOut: render ["+this.state.mode+"]");
        var renderState = <LogInForm eventSubmitLogin={this.eventSubmitLogin} eventClickRegister={this.eventClickRegister} />;
        if (this.state.mode == 'REGISTER_FORM') {
            renderState = <RegisterForm eventSubmitRegister={this.eventSubmitRegister} eventClickRegisterCancel={this.eventClickRegisterCancel} />;
        }
        return (
            <div>
              {renderState}
            </div>
        );
    }
});

module.exports = LoggedOut;

