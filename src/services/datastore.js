import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBibiwRdNYJ9QVRD60wTV4EJfhrgzboOfM',
  authDomain: 'react-notes-5d070.firebaseapp.com',
  databaseURL: 'https://react-notes-5d070.firebaseio.com',
  projectId: 'react-notes-5d070',
  storageBucket: 'react-notes-5d070.appspot.com',
  messagingSenderId: '587970165402',
};
firebase.initializeApp(config);
const database = firebase.database();
const databaseRef = database.ref('notes');

export function fetchNotes(callback) {
  databaseRef.on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function getMaxZ(callback) {
  database.ref('maxZ').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function addNote(note) {
  const newNoteRef = databaseRef.push();
  const
    {
      title, text, x, y, zIndex,
    } = note;
  newNoteRef.set({
    title,
    text,
    x,
    y,
    zIndex,
  });
}

// Adapted from https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields
export function updateField(id, field, data) {
  const update = {};
  update[`${id}/${field}`] = data;
  databaseRef.update(update);
}
export function updateMaxZ(maxZ) {
  const update = {};
  update.maxZ = maxZ;
  database.ref().update(update);
}

export function deleteNote(id) {
  databaseRef.child(id).remove();
}
