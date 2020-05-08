import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { auth } from "../firebase"
import "../App.scss"
import { useDispatch } from "react-redux"
import { SIGN_OUT } from "../redux/auth"

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  return (
    <div className="navbar">
      <Link to="/">Logo</Link>
      <Link to="/dashboard">-Dashboard</Link>
      <Link to="/">-Home</Link>
      <Link to="/signin">-Signin</Link>

      {isAuthenticated ? (
        <div className="user-name-img-container">
          Welcome,
          {user.displayName}
          <img className="profile-image" src={user.photoURL} alt="" />
          <button onClick={() => auth.signOut()}>Log Out</button>
          <button onClick={() => dispatch(SIGN_OUT())}>log---</button>
        </div>
      ) : null}
    </div>
  )
}
