'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var UserActions = require('./../actions/UserActions');
var UserStore   = require('./../stores/UserStore');
var LoggedOut   = require('./UserDetails/LoggedOut');
var LoggedIn    = require('./UserDetails/LoggedIn');
var Register    = require('./UserDetails/Register');

var UserDetails = React.createClass({
    mixins: [Reflux.connect(UserStore, 'userStore')],

    onloginWithPassword: function (event) {
        // Called when the user has successfully logged on
        console.log("UserDetails: User has logged on");
    },

    handleLoginSubmit: function (event) {
        console.log("LoginForm: handleLoginSubmit");
        event.preventDefault();
        var username = this.refs.username.getDOMNode();
        var password = this.refs.password.getDOMNode();
        UserActions.loginWithPassword(username.value, password.value)
    },
    
    renderLoggedOut: function() {
        return (
            <div>
              <p>Current state = { this.state.userStore.state }</p>
              <form onSubmit={this.handleLoginSubmit}>
                <div><input placeholder="User Name" ref="username" type="text" /></div>
                <div><input placeholder="Password" ref="password" type="password" /></div>
                <div><input type="submit" value="Submit" /></div>
              </form>
            </div>
        );
    },


    render: function() {
        console.log("UserDetails: render ["+this.state.userStore.state+"]");
        var renderState = 'NOT_LOGGED_IN';
        switch(this.state.userStore.state) {
            case 'NOT_LOGGED_IN':
                console.log("UserDetails: case NOT_LOGGED_IN");
                renderState = <LoggedOut />
                break;
            case 'LOGGED_IN':
                console.log("UserDetails: case LOGGED_IN");
                renderState = <LoggedIn />
                break;
            case 'REGISTER':
                console.log("UserDetails: case REGISTER");
                renderState = <Register />
                break;
        }
        return (
            <div>
              {renderState}
            </div>
        )
    }
});

module.exports = UserDetails;

