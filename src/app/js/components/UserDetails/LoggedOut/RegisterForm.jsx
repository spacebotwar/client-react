'use strict';

var React           = require('react');
var Reflux          = require('reflux');

var RegisterForm = React.createClass({

    eventSubmitRegister: function(event) {
        console.log("RegisterForm: eventSubmitRegister");
        event.preventDefault();
        var username = this.refs.username.getDOMNode();
        var password = this.refs.password.getDOMNode();
        var email = this.refs.email.getDOMNode();
        this.props.eventSubmitRegister(event,username.value, password.value, email.value);
    },

    render: function() {
        console.log("RegisterForm: render");

        return (
            <div>
              <form onSubmit={ this.eventSubmitRegister }>
                <input placeholder="Username" ref="username" type="text" />
                <input placeholder="Password" ref="password" type="text" />
                <input placeholder="Email"    ref="email" type="text" />
                <input type="submit" value="Register" />
                <a href="" onClick={ this.props.eventClickRegisterCancel }>Cancel</a>
              </form>
            </div>
        );
    }
});

module.exports = RegisterForm;
