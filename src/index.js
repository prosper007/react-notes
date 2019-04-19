import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Container from 'react-bootstrap/Container';
import './style.scss';
import CreateNote from './components/CreateNote';
import NotesContainer from './components/NotesContainer';

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
      notes: Map({
        0: {
          title: 'Obi is a boy',
          text: 'Sike! He\'s not',
          x: 0,
          y: 0,
          zIndex: 0,
        },
        1: {
          title: 'Wanna hear a joke?',
          text: 'You',
          x: 0,
          y: 0,
          zIndex: 0,
        },
        2: {
          title: 'Test Markdown',
          text: '# large ',
          x: 0,
          y: 0,
          zIndex: 0,
        },
        3: {
          title: 'Test Markdown 2',
          text: '![](http://i.giphy.com/gyRWkLSQVqlPi.gif)',
          x: 0,
          y: 0,
          zIndex: 0,
        },
      }),
      newNote: this.emptyNote,
      currentIndex: 4,
    };
    this.handleNewTitleChange = this.handleNewTitleChange.bind(this);
    this.handleNewTextChange = this.handleNewTextChange.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
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
    this.setState(prevState => ({ notes: prevState.notes.set(prevState.currentIndex, prevState.newNote) }));
    this.setState({ newNote: this.emptyNote });
    this.setState(prevState => ({ currentIndex: prevState.currentIndex + 1 }));
  }

  handleTitleUpdate(id, event) {
    event.persist();
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (value) => { return Object.assign({}, value, { title: event.target.value }); }),
    }));
  }

  handleTextUpdate(id, event) {
    event.persist();
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (value) => { return Object.assign({}, value, { text: event.target.value }); }),
    }));
  }

  deleteNote(id) {
    this.setState(prevState => ({ notes: prevState.notes.delete(id) }));
  }

  render() {
    return (
      <Container>
        <CreateNote
          newNote={this.state.newNote}
          handleNewTitleChange={this.handleNewTitleChange}
          handleNewTextChange={this.handleNewTextChange}
          createNewNote={this.createNewNote}
        />
        <NotesContainer
          notes={this.state.notes}
          handleTitleUpdate={this.handleTitleUpdate}
          handleTextUpdate={this.handleTextUpdate}
          deleteNote={this.deleteNote}
        />
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
