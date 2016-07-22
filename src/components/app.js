import React, { Component } from 'react';
import Immutable from 'immutable';

import Note from './note.js';
import NewNoteBar from './new_note_bar.js';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      id: 0,
      zIndex: 0,
    };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  addNote(title) {
    this.setState({
      notes: this.state.notes.set(this.state.id, {
        title,
        text: 'text',
        x: 0,
        y: 20,
        width: 200,
        height: 125,
        zIndex: this.state.zIndex + 1,
      }),
      id: this.state.id + 1,
      zIndex: this.state.zIndex + 1,
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  updateNote(id, newNote) {
    this.setState({
      notes: this.state.notes.update(id, (note) => { return Object.assign({}, note, newNote); }),
      zIndex: this.state.zIndex + 1,
    });
  }

  render() {
    return (
      <div className="master_flex">
        <NewNoteBar addNote={this.addNote} />
        <div className="draggable_area">
          {this.state.notes.entrySeq().map(([id, note]) => <Note key={id} id={id} note={note} zIndex={this.state.zIndex} deleteNote={this.deleteNote} updateNote={this.updateNote} />)}
        </div>
      </div>
    );
  }
}

export default App;
