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
        {user ? (
          <>
            <img className="profile-image" src={user.photoURL} alt="" />

            <span className="user-name">
              Welcome,
              {user.displayName}
            </span>

            <div>
              <div className={user && user.warmup ? "card-done" : "card"}>
                <h1>
                  Warmup-
                  {user && user.warmup ? "yes" : "no"}
                </h1>

                <button onClick={() => modifyUserW()}>warmup</button>
              </div>
              <div className={user && user.asana ? "card-done" : "card"}>
                <h1>
                  Asana-
                  {user && user.asana ? "yes" : "no"}
                </h1>
                <button onClick={() => modifyUserA()}>asana</button>
              </div>
              <div className={user && user.pranayama ? "card-done" : "card"}>
                <h1>
                  Pranayama-
                  {user && user.pranayama ? "yes" : "no"}
                </h1>
                <button onClick={() => modifyUserP()}>pranayama</button>
              </div>
              <div className={user && user.dhyana ? "card-done" : "card"}>
                <h1>
                  Dhyana-
                  {user && user.dhyana ? "yes" : "no"}
                </h1>
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

      {/* {props.children} */}
    </div>
  )
}

export default App
