import React from "react"
import { signInWithGoogle, signInWithFacebook } from "../firebase"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

export default function Signin() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) return <Redirect to="/dashboard" />
  else
    return (
      <div>
        <>
          <h1>You are Logged Out</h1>
          <button onClick={signInWithGoogle}>Google</button>
          <button onClick={signInWithFacebook}>Facebook</button>
          Please sign in
        </>
        <h1>Signin</h1>
      </div>
    )
}
