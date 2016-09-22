import React, { Component } from 'react';
import { Link } from 'react-router';

import '../styles/main.less';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Hello, world!</h1>
        <Link to="/">View List</Link>
        <Link to="/create">Add New</Link>
        { this.props.children }
      </div>
    );
  }
}

export default App;
