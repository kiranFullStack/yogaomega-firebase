import React, { useState, useEffect } from "react"
import "./App.scss"
import {
  signInWithGoogle,
  signInWithFacebook,
  auth,
  handleUserProfile,
  firestore,
} from "./firebase"
import { useSelector, useDispatch } from "react-redux"
import { REDUXTEST, USERAUTH } from "./redux/auth"

function App(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [idToken, setIdToken] = useState(null)
  const [user, setUser] = useState(null)

  const modifyUser = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,
        asana: !user.asana,
        pranayama: !user.pranayama,
        dhyana: !user.dhyana,
        warmup: !user.warmup,
      })
  }

  const modifyUserW = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,

        warmup: !user.warmup,
      })
  }

  const modifyUserA = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,

        asana: !user.asana,
      })
  }

  const modifyUserP = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,

        pranayama: !user.pranayama,
      })
  }

  const modifyUserD = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,

        dhyana: !user.dhyana,
      })
  }

  useEffect(() => {
    auth.onAuthStateChanged(async () => {
      if (auth.currentUser) {
        const userRef = await handleUserProfile(auth.currentUser)
        userRef.onSnapshot((snapshot) => {
          setUser({
            uid: snapshot.id,
            ...snapshot.data(),
          })
        })
        setIdToken(await auth.currentUser.getIdToken())
      } else {
        setIdToken(null)
        setUser(null)
      }
    })
  }, [])

  useEffect(() => {
    dispatch(USERAUTH(user))
  }, [user])

  return (
    <div className="App">
      <div>
        {user ? (
          <>
            <img src={user.photoURL} alt="" />
            <h1>
              {user.displayName}
              {user.email}
              <br />
              Warmup-
              <button onClick={() => modifyUserW()}>warmup</button>
              {user && user.warmup ? "yes" : "no"}
              <br />
              Asana-
              {user && user.asana ? "yes" : "no"} <br />
              <button onClick={() => modifyUserA()}>asana</button>
              Pranayama-
              {user && user.pranayama ? "yes" : "no"} <br />
              <button onClick={() => modifyUserP()}>pranayama</button>
              Dhyana-
              {user && user.dhyana ? "yes" : "no"}
              <button onClick={() => modifyUserD()}>dhyana</button>
            </h1>
            <button onClick={() => modifyUser()}>Modify</button>
            <button
              onClick={() => {
                dispatch(REDUXTEST("This is my payload"))
              }}
            >
              redux
            </button>
          </>
        ) : (
          "Please sign in"
        )}
      </div>

      {user ? (
        <button onClick={() => auth.signOut()}>Signout</button>
      ) : (
        <>
          <button onClick={signInWithGoogle}>Google</button>
          <button onClick={signInWithFacebook}>Facebook</button>
        </>
      )}

      <code>{user ? idToken : "Please sign in"}</code>
      {props.children}
    </div>
  )
}

export default App
