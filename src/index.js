import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Container from 'react-bootstrap/Container';
import './style.scss';
import CreateNote from './components/CreateNote';
import NotesContainer from './components/NotesContainer';
import * as db from './services/datastore';

class App extends Component {
  emptyNote = {
    title: '',
    text: '',
    x: 0,
    y: 0,
    zIndex: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      notes: Map(),
      newNote: this.emptyNote,
      maxZ: 0,
    };
    this.handleNewTitleChange = this.handleNewTitleChange.bind(this);
    this.handleNewTextChange = this.handleNewTextChange.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
    db.getMaxZ((maxZ) => {
      this.setState({ maxZ });
    });
  }

  handleNewTitleChange(event) {
    event.persist();
    this.setState(prevState => ({ newNote: Object.assign({}, prevState.newNote, { title: event.target.value }) }));
  }

  handleNewTextChange(event) {
    event.persist();
    this.setState(prevState => ({ newNote: Object.assign({}, prevState.newNote, { text: event.target.value }) }));
  }

  createNewNote() {
    db.addNote(this.state.newNote);
    this.setState({ newNote: this.emptyNote });
  }

  handleTitleUpdate(id, event) {
    event.persist();
    const updatedTitle = event.target.value;
    db.updateField(id, 'title', updatedTitle);
  }

  handleTextUpdate(id, event) {
    event.persist();
    const updatedText = event.target.value;
    db.updateField(id, 'text', updatedText);
  }

  deleteNote(id) {
    db.deleteNote(id);
  }

  updatePosition(id, position) {
    const { x, y } = position;
    db.updateField(id, 'x', x);
    db.updateField(id, 'y', y);
    db.updateMaxZ(this.state.maxZ + 1);
    db.updateField(id, 'zIndex', this.state.maxZ);
  }

  render() {
    return (
      <div>
        <Container>
          <CreateNote
            newNote={this.state.newNote}
            handleNewTitleChange={this.handleNewTitleChange}
            handleNewTextChange={this.handleNewTextChange}
            createNewNote={this.createNewNote}
          />
        </Container>
        <NotesContainer
          notes={this.state.notes}
          handleTitleUpdate={this.handleTitleUpdate}
          handleTextUpdate={this.handleTextUpdate}
          deleteNote={this.deleteNote}
          updatePosition={this.updatePosition}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
