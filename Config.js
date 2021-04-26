import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBLpk28Aj2Na7bhqyuX7NoH9-NVku44lGA",
  authDomain: "book-santa-d073a.firebaseapp.com",
  projectId: "book-santa-d073a",
  storageBucket: "book-santa-d073a.appspot.com",
  messagingSenderId: "1041400578183",
  appId: "1:1041400578183:web:7cf86fcacf2a644228b822"
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();