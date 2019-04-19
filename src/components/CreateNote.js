import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateNote = (props) => {
  return (
    <Form className="create-note" onSubmit={e => e.preventDefault()}>
      <Form.Control
        id="note-title"
        className="note-field"
        type="text"
        placeholder="Title"
        value={props.newNote.title}
        onChange={props.handleNewTitleChange}
      />
      <TextareaAutosize
        id="note-content"
        className="note-field"
        type="text"
        placeholder="Take a note..."
        value={props.newNote.text}
        onChange={props.handleNewTextChange}
      />
      <Button id="createNoteBtn" variant="outline-dark" size="sm" type="button" onClick={props.createNewNote}>Noted</Button>
    </Form>
  );
};

export default CreateNote;
