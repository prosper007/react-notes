import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import Form from 'react-bootstrap/Form';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.suppressEnter = this.toggleEdit.bind(this);
  }

  toggleEdit = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  render() {
    const noteContent = !this.state.isEditing
      ? (
        <div className="display-note">
          <div className="note-title">
            <h5>{this.props.note.title}</h5>
          </div>
          <div className="note-text" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      )
      : (
        <Form className="edit-note" onSubmit={e => e.preventDefault()}>
          <Form.Control
            className="note-field"
            type="text"
            value={this.props.note.title}
            onChange={this.props.handleTitleUpdate}
          />
          <TextareaAutosize
            className="note-field"
            type="text"
            value={this.props.note.text}
            onChange={this.props.handleTextUpdate}
          />
        </Form>
      );

    const updateButton = !this.state.isEditing
      ? (
        <button type="button" onClick={this.toggleEdit}><i className="far fa-edit" /> </button>
      )
      : (
        <button type="button" onClick={this.toggleEdit}><i className="fas fa-check" /> </button>
      );

    return (
      <Draggable
        handle=".move"
        defaultPosition={{ x: 20, y: 20 }}
        position={null}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
        bounds="body"
      >
        <div className="note-box">
          {noteContent}
          <div className="actions">
            {updateButton}
            <button type="button" onClick={this.props.deleteNote}><i className="far fa-trash-alt" /></button>
            <button className="move" type="button"><i className="fas fa-arrows-alt" /></button>
          </div>
        </div>
      </Draggable>
    );
  }
}
export default Note;
