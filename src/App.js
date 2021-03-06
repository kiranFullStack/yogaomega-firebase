import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import { USERAUTH } from "./redux/auth"
import { auth, handleUserProfile } from "./firebase"

function App(props) {
  const dispatch = useDispatch()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

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

  return <div className="App">{props.children}</div>
}

export default App
