
import React, { Component } from 'react';
import ResizableAndMovable from 'react-resizable-and-movable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    // details of each note instance
    this.state = {
      isEditing: false,
    };

    // Binding statements
    this.onInputChange = this.onInputChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onResize = this.onResize.bind(this);
  }


  onInputChange(event) {
    this.props.updateNote(this.props.id, { text: event.target.value });
  }

  // Handle editing
  onEdit(event) {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onDelete(event) {
    this.props.deleteNote(this.props.id);
  }

  onDrag(event, ui) {
    this.props.updateNote(this.props.id, {
      x: ui.x,
      y: ui.y,
    });
  }

  onResize(event, ui) {
    this.props.updateNote(this.props.id, {
      width: ui.width,
      height: ui.height,
    });
  }

  renderEditButton() {
    if (this.state.isEditing) {
      return <i onClick={this.onEdit} className="fa fa-check" />;
    } else {
      return <i onClick={this.onEdit} className="fa fa-pencil" />;
    }
  }

  renderContent() {
    if (this.state.isEditing) {
      return (
        <div className="content">
          <textarea onChange={this.onInputChange} value={this.props.note.text} />
        </div>
      );
    } else {
      return <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text) }} />;
    }
  }

  render() {
    return (
      // Examples and inspiration found from https://github.com/bokuweb/react-resizable-and-movable
      <ResizableAndMovable
        onResize={this.onResize}
        onDrag={this.onDrag}
        x={this.props.note.x}
        y={this.props.note.y}
        width={this.props.note.width}
        height={this.props.note.height}
        minWidth={200}
        minHeight={125}
        zIndex={this.props.note.zIndex}
      >
        <div className="note">
          <div className="navbar">
            <div className="bar">
              <span className="title">{this.props.note.title}</span>
              <div className="controls">
                <i onClick={this.onDelete} className="fa fa-trash-o" />
                {this.renderEditButton()}
              </div>
            </div>
          </div>
          {this.renderContent()}
        </div>
      </ResizableAndMovable>
    );
  }
}

export default Note;
