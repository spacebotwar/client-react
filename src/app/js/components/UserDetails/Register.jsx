var React               = require('react');
var UserActions         = require('js/actions/UserActions.jsx');

var Register = React.createClass({

    handleLogoutSubmit: function (event) {
        console.log("LoggedOut: handleLogoutSubmit");
        event.preventDefault();
        UserActions.logout();
        console.log("LoggedIn: handleLogoutSubmit end");
    },
    handleCancel: function (event) {
        console.log("LoggedOut: handleCancel");
        event.preventDefault();
        UserActions.logout();
    },

    render: function() {
        console.log("Register: render");

        return (
            <div>
              <form onSubmit={ this.handleLogoutSubmit }>
                <input placeholder="Username" ref="username" type="text" />
                <input placeholder="Password" ref="password" type="text" />
                <input placeholder="Email"    ref="email" type="text" />
                <input type="submit" value="Register" />
                <a href="" onClick={ this.handleCancel }>Cancel</a>
              </form>
            </div>
        );
    }
});

module.exports = Register;

