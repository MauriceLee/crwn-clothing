import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCek1X_32m-20bSW0ijCYVb4I6DCyWT3Vo",
  authDomain: "crwn-db-b1a09.firebaseapp.com",
  projectId: "crwn-db-b1a09",
  storageBucket: "crwn-db-b1a09.appspot.com",
  messagingSenderId: "480517608884",
  appId: "1:480517608884:web:56877fe32166f9b9ee4ee1",
  measurementId: "G-KBHLMRNMX6"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase