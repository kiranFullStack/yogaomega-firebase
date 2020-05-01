import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"

export default function Dashboard() {
  const [redirctTo, setRedirctTo] = useState(false) // your state value to manipulate

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirctTo(true)
    }

    // return to another component
  })

  if (redirctTo) {
    return <Redirect to="/signup" />
  } else {
    return <div> Dashboard </div>
  }
}
