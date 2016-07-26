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
  firebase.database().ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}


export function addNote(note) {
  const id = database.ref('notes').push().key;

  database.ref('notes').child(id).set(note);
}

export function deleteNote(id) {
  firebase.database().ref('notes').child(id)
  .remove();
}

export function updateNote(id, fields) {
  database.ref('notes').child(id).update(fields);
}
