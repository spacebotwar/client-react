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

    render: function() {
        console.log("LoggedOut: render");

        if (this.props.visible) {
            return (
                <div>
                  <form onSubmit={ this.handleLoginSubmit }>
                    <input placeholder="Username" ref="username" type="text" />
                    <input placeholder="Password" ref="password" type="password" />
                    <input type="submit" value="Login" />
                    <a href="">register</a>
                  </form>
                </div>
            );
        }
        else {
            return (
                <div>hello</div>
            );
        }
    }
});

module.exports = LoggedOut;

