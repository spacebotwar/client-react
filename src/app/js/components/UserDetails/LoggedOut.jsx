var React               = require('react');
var UserActions         = require('./../../actions/UserActions');

var LoggedOut = React.createClass({
    handleLoginSubmit: function (event) {
        console.log("LoggedOut: handleLoginSubmit");
        event.preventDefault();
        var username = this.refs.username.getDOMNode();
        var password = this.refs.password.getDOMNode();
        UserActions.loginWithPassword(username.value, password.value);
        console.log("LoggedOut: handleLoginSubmit end");
    },
    register: function(event) {
        console.log("LoggedOut: register");
        event.preventDefault();
        UserActions.register();
    },

    render: function() {
        console.log("LoggedOut: render");

        return (
            <div>
              <form onSubmit={ this.handleLoginSubmit }>
                <input placeholder="Username" ref="username" type="text" />
                <input placeholder="Password" ref="password" type="password" />
                <input type="submit" value="Login" />
                <a href="" onClick={ this.register} >register</a>
              </form>
            </div>
        );
    }
});

module.exports = LoggedOut;

