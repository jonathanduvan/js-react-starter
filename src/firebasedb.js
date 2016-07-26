import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyC1e-AvxGZjkFjtuERAQlCKIw3HsgJw0EA',
  authDomain: 'jongonzalez-note-app.firebaseapp.com',
  databaseURL: 'https://jongonzalez-note-app.firebaseio.com',
  storageBucket: 'jongonzalez-note-app.appspot.com',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot);
  });
}

export function addNote(note) {
  const id = database.ref('notes').push().key;
  database.ref('notes').child(id).set(note);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function updateNoteContent(text, id) {
  database.ref('notes').child(id).update({ text });
}

// Handle editing
export function updateIsEditing(isEditing, id) {
  database.ref('notes').child(id).update({ isEditing });
}

export function updateNotePosition(x, y, id) {
  database.ref('notes').child(id).update({ x, y });
}

export function updateNoteSize(width, height, id) {
  database.ref('notes').child(id).update({ width, height });
}
