var React               = require('react');
var UserActions         = require('./../../actions/UserActions');

var LoggedIn = React.createClass({

    handleLogout: function (event) {
        console.log("LoggedOut: handleLogout");
        event.preventDefault();
        UserActions.logout();
    },

    render: function() {
        console.log("LoggedIn: render");

        return (
            <div>
              Hello Iain <a href="" onClick={ this.handleLogout }>logout</a>
            </div>
        );
    }
});

module.exports = LoggedIn;

