var React               = require('react');
var UserActions         = require('js/actions/UserActions.jsx');

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
              Hello { this.props.username } <a href="" onClick={ this.handleLogout }>logout</a>
            </div>
        );
    }
});

module.exports = LoggedIn;

