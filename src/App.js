import React, { useState, useEffect } from "react"
import "./App.scss"
import {
  signInWithGoogle,
  signInWithFacebook,
  auth,
  handleUserProfile,
  firestore,
} from "./firebase"

function App(props) {
  const [user, setUser] = useState(null)

  return (
    <div>
      <h1>App</h1>
      {props.children}
    </div>
  )
}

export default App
