
import React, { Component } from 'react';
import ResizableAndMovable from 'react-resizable-and-movable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    // Binding statements
    this.onInputChange = this.onInputChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onResize = this.onResize.bind(this);
  }


  onInputChange(event) {
    this.props.updateNoteContent(event.target.value, this.props.id);
  }

  // Handle editing
  onEdit(event) {
    this.props.updateIsEditing(!this.props.note.isEditing, this.props.id);
  }

  onDelete(event) {
    this.props.deleteNote(this.props.id);
  }

  onDrag(event, ui) {
    const x = ui.position.left;
    const y = ui.position.top;
    this.props.updateNotePosition(x, y, this.props.id);
  }

  onResize(event, ui) {
    this.props.updateNoteSize(ui.width, ui.height, this.props.id);
  }

  renderEditButton() {
    if (this.props.note.isEditing) {
      return <i onClick={this.onEdit} className="fa fa-check" />;
    } else {
      return <i onClick={this.onEdit} className="fa fa-pencil" />;
    }
  }

  renderContent() {
    if (this.props.note.isEditing) {
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
        canUpdatePositionByParent
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
