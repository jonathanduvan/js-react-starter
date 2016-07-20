
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


}

export default Node;
