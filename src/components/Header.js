import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { useDispatch } from "react-redux"
import { SIGN_OUT } from "../redux/auth"
import Slider from "./Slider"

export default function Header() {
  const [menu, setmenu] = useState(false)

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  return (
    <div className="navbar">
      {/* <Slider isOpen={menu} /> */}
      {/* <button
        onClick={() => setmenu(!menu)}
        className={`hamburger hamburger--collapse ${menu ? "is-active" : null}`}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button> */}

      <Link to="/">Logo</Link>
      <Link to="/dashboard">-Dashboard</Link>
      <Link to="/shop">-Shop</Link>
      <Link to="/blog">-Blog</Link>
      {!isAuthenticated ? <Link to="/signin">-Signin</Link> : null}

      {isAuthenticated ? (
        <div className="user-name-img-container">
          Welcome,
          {user.displayName}
          <img className="profile-image" src={user.photoURL} alt="" />
          <button onClick={() => dispatch(SIGN_OUT())}>Log Out</button>
        </div>
      ) : null}
    </div>
  )
}
