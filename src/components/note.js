
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Node extends Component {
  constructor(props) {
    super(props);

    Note.propTypes = {
      deleteNote: React.PropTypes.func,
      updateNote: React.PropTypes.func,
    };


    // details of each note instance
    this.state = {
      isEditing: false,
      id: this.props.id,
      title: this.props.note.title,
      text: this.props.note.text,
      x: this.props.note.x,
      y: this.props.note.y,
      width:200,
      height:200,
      zIndex: this.props.note.zIndex,
    };

    // Performable actions on a note
    this.onEdit = this.onEdit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
  }

  // Handle editing
  onEdit(event) {
    if (this.state.isEditing) { // If editing is occurring
      this.setState({ isEditor: false }); // set to false
      this.props.updateNote(this.state.id, this.state); //update
    }

    else {
      this.setState({ isEditing: true });
    }
  }

  onInputChange(event) {
  this.setState({ text: event.target.value });
  }

  onDelete(event) {
    this.props.deleteNote();
  }

  onDrag(event, ui) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { ui.position.left, ui.position.top }); }),
    });
    this.updateLayers(id);
  }

  onStartDrag() {
    this.setState({ zIndex: this.props.maxzIndex + 1 });
    this.props.updateNote(this.state.id, this.state);
  }
  onStopDrag() {
    this.props.updateNote(this.state.id, this.state);
  }

  onClick(event) {
    this.props.updateLayers();
  }

  render () {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={ x: 20, y: 20 }
        position={position}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note" style={{ zIndex: this.state.zIndex }}>
              <div className="toolbar">
                <div className="toolbar_leftflex">
                  <h1>{this.state.title}</h1>
                  <i className="fa fa-trash-o paddleft" aria-hidden="true" onClick={this.onDelete}></i>
                  {this.renderIcon()}
                </div>
                <div className="toolbar_rightflex">
                  <i className="fa fa-arrows-alt note-mover paddleft" aria-hidden="true"></i>
                </div>
              </div>
              {this.renderTheBox()}
            </div>
          </Draggable>
      );
      }
    }

    export default Note;
