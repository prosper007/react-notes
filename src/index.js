import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import io from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import './style.scss';
import CreateNote from './components/CreateNote';
import NotesContainer from './components/NotesContainer';
// import * as db from './services/datastore';

const socketserver = 'http://localhost:9090';

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
    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  componentDidMount() {
    this.socket.on('notes', (notes) => {
      this.setState({ notes: Map(notes) });
    });
    // db.getMaxZ((maxZ) => {
    //   this.setState({ maxZ });
    // });
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
    this.socket.emit('createNote', this.state.newNote);
    this.setState({ newNote: this.emptyNote });
  }

  handleTitleUpdate(id, event) {
    event.persist();
    const updatedTitle = event.target.value;
    this.socket.emit('updateNote', id, { title: updatedTitle });
  }

  handleTextUpdate(id, event) {
    event.persist();
    const updatedText = event.target.value;
    this.socket.emit('updateNote', id, { text: updatedText });
  }

  deleteNote(id) {
    this.socket.emit('deleteNote', id);
  }

  updatePosition(id, position) {
    const { x, y } = position;
    this.socket.emit('updateNote', id, { x });
    this.socket.emit('updateNote', id, { y });
    // db.updateMaxZ(this.state.maxZ + 1);
    this.socket.emit('updateNote', id, { zIndex: this.state.maxZ });
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
