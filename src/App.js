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
import { USERAUTH } from "./redux/auth"

function App(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

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
        setToken(await auth.currentUser.getIdToken())
      } else {
        setToken(null)
        setUser(null)
      }
    })
  }, [])

  useEffect(() => {
    dispatch(
      USERAUTH({
        user,
        token,
      })
    )
  }, [user])

  return (
    <div className="App">
      <div>
        {isAuthenticated ? (
          <>
            <img className="profile-image" src={user.photoURL} alt="" />

            <span className="user-name">
              Welcome,
              {user.displayName}
            </span>

            <div>
              <div>
                Warmup-
                {user && user.warmup ? "yes" : "no"}
                <button onClick={() => modifyUserW()}>warmup</button>
              </div>
              <div>
                Asana-
                {user && user.asana ? "yes" : "no"}
                <button onClick={() => modifyUserA()}>asana</button>
              </div>
              <div>
                Pranayama-
                {user && user.pranayama ? "yes" : "no"}
                <button onClick={() => modifyUserP()}>pranayama</button>
              </div>
              <div>
                Dhyana-
                {user && user.dhyana ? "yes" : "no"}
                <button onClick={() => modifyUserD()}>dhyana</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <button onClick={signInWithGoogle}>Google</button>
            <button onClick={signInWithFacebook}>Facebook</button>
            Please sign in
          </>
        )}
      </div>

      {props.children}
    </div>
  )
}

export default App
