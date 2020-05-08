import React, { useState, useEffect } from "react"
import {
  signInWithGoogle,
  signInWithFacebook,
  auth,
  handleUserProfile,
} from "../firebase"
import { useDispatch } from "react-redux"
import { USERAUTH } from "../redux/auth"

export default function Signin() {
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

  return (
    <div>
      <>
        <h1>This is the logedout page</h1>
        <button onClick={signInWithGoogle}>Google</button>
        <button onClick={signInWithFacebook}>Facebook</button>
        Please sign in
      </>
      <h1>Signin</h1>
    </div>
  )
}
