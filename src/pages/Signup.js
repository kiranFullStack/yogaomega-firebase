import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { OAUTHWITHGOOGLE, OAUTHWITHFACEBOOK } from "../redux/auth"

export default function Signup(props) {
  let history = useHistory()

  const errorMessage = useSelector((state) => state.auth.errorMessage)

  const dispatch = useDispatch()

  return (
    <>
      <h1>Signup</h1>
    </>
  )
}
