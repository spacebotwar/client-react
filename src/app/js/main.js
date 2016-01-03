'use strict';

import React        from 'react';
import About        from 'js/About.jsx';
import { render }   from 'react-dom'

import { browserHistory, Router, Route, Link } from 'react-router'

class App extends React.Component {

    render() {
        return (
            <div>
               <p>hello world</p>
               { this.props.children }
            </div>
        );
    }
}


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
    </Route>
  </Router>
), document.getElementById('example'))

