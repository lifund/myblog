import React from 'react';

class App extends React.Component {
  render() {
    return React.createElement('div', {'prop1':'world'}, `Hello ${this.props.prop1}!`);
  }
}


export default App
