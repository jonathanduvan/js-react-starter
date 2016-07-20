
import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      text: this.props.note.text,
    };
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
    )
  }
}

export default Node;
