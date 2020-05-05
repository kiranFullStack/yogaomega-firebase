import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { auth } from "../firebase"
import "../App.scss"

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <div className="navbar">
      {/* <div> */}
      <Link to="/">Home</Link>

      {isAuthenticated ? (
        <button onClick={() => auth.signOut()}>Log Out</button>
      ) : null}
    </div>
  )
}
