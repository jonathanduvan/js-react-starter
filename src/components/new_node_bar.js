
import React, { Component } from 'react';

class NewNodeBar extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' }; // title of the new node
    this.onInputChange = this.onInputChange.bind(this);
  }

  // What happens when the user inputs a title into the new node bar
  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ title: event.target.value });
  }

  addNote(event) {

  }

  render() {
    return (
      <div id="newnodebar">
        <input onChange={this.onInputChange} value={this.state.title} placeholder="new note title" />
      </div>
    );
  }
}

export default NewNodeBar;
