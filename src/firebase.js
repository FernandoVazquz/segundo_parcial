import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyBuYgaG_l52pSB5_8WqkJrfSbNMKncQYUg",
  authDomain: "vue-todo-2021-44f7b.firebaseapp.com",
  projectId: "vue-todo-2021-44f7b",
  storageBucket: "vue-todo-2021-44f7b.appspot.com",
  messagingSenderId: "450071182648",
  appId: "1:450071182648:web:cc1a265b9de840ceb055cd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()