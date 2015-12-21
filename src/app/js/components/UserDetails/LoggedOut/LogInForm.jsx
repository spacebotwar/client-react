'use strict';

var React           = require('react');
var Reflux          = require('reflux');

var LogInForm = React.createClass({

    eventSubmitLogin: function(event) {
        console.log("LogInForm: eventSubmitLogin");
        event.preventDefault();
        var username = this.refs.username.getDOMNode();
        var password = this.refs.password.getDOMNode();
        this.props.eventSubmitLogin(event,username.value, password.value);
    },

    render: function() {
        console.log("LogInForm: render");

        return (
            <div>
              <form onSubmit={ this.eventSubmitLogin }>
                <input placeholder="Username" ref="username" type="text" />
                <input placeholder="Password" ref="password" type="password" />
                <input type="submit" value="Login" />
                <a href="" onClick={ this.props.eventClickRegister } >register</a>
              </form>
            </div>
        );
    }
});

module.exports = LogInForm;

