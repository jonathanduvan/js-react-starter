
import React, { Component } from 'react';

class NewNoteBar extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' }; // title of the new node
    this.onInputChange = this.onInputChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  // What happens when the user inputs a title into the new node bar
  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ title: event.target.value });
  }

  // function to add new node
  addNote(event) {
    this.props.create(this.state.title);
    this.setState({ title: '' });
  }

  render() {
    return (
      <div id="newnotebar">
        <input onChange={this.onInputChange} value={this.state.title} placeholder="new note title" />
        <button onClick={this.onCreate}>Create</button>
      </div>
    );
  }
}

export default NewNoteBar;
