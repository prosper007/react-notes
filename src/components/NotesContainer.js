import React from 'react';
import Note from './Note';

const NotesContainer = (props) => {
  const notes = props.notes.entrySeq().map(([id, note]) => {
    return (
      <Note
        key={id}
        note={note}
        id={id}
        handleTitleUpdate={event => props.handleTitleUpdate(id, event)}
        handleTextUpdate={event => props.handleTextUpdate(id, event)}
        deleteNote={() => props.deleteNote(id)}
      />
    );
  });

  return (
    <div className="notes-container">
      {notes}
    </div>
  );
};

export default NotesContainer;
