import React, { Component } from 'react';
import Immutable from 'immutable';
import Welcome from './welcome';

import Note from './note';
import NewNoteBar from './new_note_bar';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      maxzIndex: 0,
    };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  createNote(title) {
    const id = this.state.id + 1;
    const newNote = {
      title,
      text: '',
      x: 25,
      y: 10,
      width: 200,
      height: 200,
      zIndex: this.state.zIndex + 1,
    };
    this.setState({
      notes: this.state.notes.set(id, newNote),
    });
  }

  // To delete a note from the app
  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  updateNote(id, newNote) {
    this.setState({
      notes: this.state.notes.update(id, (note) => { return Object.assign({}, note, newNote); }),
      maxzIndex: this.state.maxzIndex + 1,
    });
  }

  render() {
    return (
      <div className="app_box">
        <NewNoteBar addNote={this.addNote} />
        <div className="work_space">
          {this.state.notes.entrySeq().map(([id, note]) => <Note key={id} id={id} note={note} maxzIndex={this.state.maxzIndex} deleteNote={this.deleteNote} updateNote={this.updateNote} />)}
        </div>
      </div>

    );
  }
}

export default App;
