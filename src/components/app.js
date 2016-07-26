import React, { Component } from 'react';
import Immutable from 'immutable';

import Note from './note.js';
import NewNoteBar from './new_note_bar.js';
import * as firebasedb from '../firebasedb';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      zIndex: 0,
    };
    this.addNote = this.addNote.bind(this);
  }


  componentDidMount() {
    firebasedb.fetchNotes((snapshot) => {
      if (this.state.notes.size === 0 && snapshot.val()) {
        this.setState({
          notes: Immutable.Map(snapshot.val()),
          zIndex: Object.keys(snapshot.val()).length,
        });
      } else {
        this.setState({
          notes: Immutable.Map(snapshot.val()),
        });
      }
    });
  }

  addNote(title) {
    const newNote = {
      title,
      text: 'text',
      x: 0,
      y: 20,
      width: 200,
      height: 125,
      zIndex: this.state.zIndex + 1,
      isEditing: false,
    };
    firebasedb.addNote(newNote);
    this.setState({
      zIndex: this.state.zIndex + 1,
    });
    /*
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
    */
  }

  deleteNote(id) {
    firebasedb.deleteNote(id);
    /*
    this.setState({
      notes: this.state.notes.delete(id),
    });
    */
  }

  updateNoteContent(text, id) {
    firebasedb.updateNoteContent(text, id);
  }

  // Handle editing
  updateIsEditing(isEditing, id) {
    firebasedb.updateIsEditing(isEditing, id);
  }

  updateNotePosition(x, y, id) {
    firebasedb.updateNotePosition(x, y, id);
  }

  updateNoteSize(width, height, id) {
    firebasedb.updateNoteSize(width, height, id);
  }

  render() {
    return (
      <div className="master_flex">
        <NewNoteBar addNote={this.addNote} />
        <div className="draggable_area">
          {this.state.notes.entrySeq().map(([id, note]) => <Note key={id} id={id} note={note} zIndex={this.state.zIndex} deleteNote={this.deleteNote}
            updateNoteContent={this.updateNoteContent} updateIsEditing={this.updateIsEditing}
            updateNotePosition={this.updateNotePosition} updateNoteSize={this.updateNoteSize}
          />)}
        </div>
      </div>
    );
  }
}

export default App;
