
import React, { Component } from 'react';

class NewNoteBar extends Component {
  constructor(props) {
    super(props);
    NewNoteBar.propTypes = {
      addNote: React.PropTypes.func,
    };
    this.state = { title: '' }; // title of the new node
    this.onInputChange = this.onInputChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  // What happens when the user inputs a title into the new node bar
  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  // function to add new node
  onCreate(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.addNote(this.state.title);
    this.setState({ title: '' });
  }

  render() {
    return (
      <form id="note-adder" onSubmit={this.onCreate}>
        <input placeholder="new note title" onChange={this.onInputChange} value={this.state.title} />
        <button type="submit">Create</button>
      </form>
  );
  }
}

export default NewNoteBar;
