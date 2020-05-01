import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
// import { SIGNOUT } from "../redux/auth"

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/signup">Log In</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signup">Log Out</Link>
            </li>
          )}
        </ul>
      </nav>
      <h1>{isAuthenticated ? "logged in" : "logged out"}</h1>
    </div>
  )
}
