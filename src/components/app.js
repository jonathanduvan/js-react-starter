import React, { Component } from 'react';
import Immutable from 'immutable';
import Welcome from './welcome';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      // ...
    };
  }

  render() {
    return (
      <div>
        <Welcome />
      </div>
    );
  }
}

export default App;
