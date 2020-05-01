import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDk0WW8hR8qtbI1nnnV46-NS0IIoJKJ-uY",
  authDomain: "react-firebase-starter-9cf21.firebaseapp.com",
  databaseURL: "https://react-firebase-starter-9cf21.firebaseio.com",
  projectId: "react-firebase-starter-9cf21",
  storageBucket: "react-firebase-starter-9cf21.appspot.com",
  messagingSenderId: "189991189907",
  appId: "1:189991189907:web:a2f9107631b92484087c66",
}
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const providerGoogle = new firebase.auth.GoogleAuthProvider().setCustomParameters(
  { prompt: "select_account" }
)
export const signInWithGoogle = () => {
  auth.signInWithPopup(providerGoogle)
}

const providerFacebook = new firebase.auth.FacebookAuthProvider()
export const signInWithFacebook = () => {
  auth.signInWithPopup(providerFacebook)
}

export const handleUserProfile = async (userAuth) => {
  if (!userAuth) return
  const { uid } = userAuth

  const userRef = firestore.doc(`users/${uid}`)
  const snapshot = await userRef.get()
  console.log(snapshot, "snapshot")

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userAuth
    const timestamp = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdDate: timestamp,
        warmup: false,
        asana: false,
        pranayama: false,
        dhyana: false,
      })
    } catch (err) {
      console.log(err)
    }
  }
  return userRef
}

export default firebase
