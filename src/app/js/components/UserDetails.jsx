'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var UserActions = require('./../actions/UserActions');
var UserStore   = require('./../stores/UserStore');
var LoggedOut   = require('./UserDetails/LoggedOut');

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
        return (
            <LoggedOut visible={ this.state.userStore.state === 'NOT_LOGGED_IN' } />
        )
    }
});

module.exports = UserDetails;

