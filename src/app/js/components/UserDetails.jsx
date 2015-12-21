'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var UserActions = require('./../actions/UserActions');
var UserStore   = require('./../stores/UserStore');
var LoggedOut   = require('./UserDetails/LoggedOut');
var LoggedIn    = require('./UserDetails/LoggedIn');

var UserDetails = React.createClass({
    mixins: [Reflux.connect(UserStore, 'userStore')],

    render: function() {
        var user = this.state.userStore;
        console.log("UserDetails: render ["+user.mode+"]");
        var renderState = <LoggedOut />;
        if (user.mode == 'LOGGED_IN') {
            renderState = <LoggedIn username={user.username } />;
        }
        return (
            <div>
              {renderState}
            </div>
        )
    }
});

module.exports = UserDetails;

