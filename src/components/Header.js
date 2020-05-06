import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { auth } from "../firebase"
import "../App.scss"

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="navbar">
      <Link to="/">Logo</Link>

      {isAuthenticated ? (
        <div className="user-name-img-container">
          Welcome,
          {user.displayName}
          <img className="profile-image" src={user.photoURL} alt="" />{" "}
          <button onClick={() => auth.signOut()}>Log Out</button>
        </div>
      ) : null}
    </div>
  )
}
