var React       = require('react');
var UserDetails = require('js/components/UserDetails');

var App = React.createClass({
    render: function() {
        return (
            <div>
              <UserDetails />
            </div>
        );
    }

});

module.exports = App;

