import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { firestore } from "../firebase"
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import Asana from "./Asana"
import Pranayama from "./Pranayama"
import Warmup from "./Warmup"
import Dhyana from "./Dhyana"
export default function Dashboard() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  let { path, url } = useRouteMatch()

  const modifyUserW = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,
        warmup: !user.warmup,
      })
  }

  const modifyUserA = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,

        asana: !user.asana,
      })
  }

  const modifyUserP = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,

        pranayama: !user.pranayama,
      })
  }

  const modifyUserD = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        ...user,

        dhyana: !user.dhyana,
      })
  }

  if (!isAuthenticated) return <Redirect to="/signin" />

  return (
    <div>
      <h1>Dashboard</h1>
      <>
        <Switch>
          <Route exact path={path}>
            <div>
              <Link to={`${url}/warmup`}>
                <div className={user && user.warmup ? "card-done" : "card"}>
                  <h1>
                    Warmup-
                    {user && user.warmup ? "yes" : "no"}
                  </h1>
                  <span
                    className="wistia_embed wistia_async_16kdf61uw9 popover=true popoverContent=link "
                    onClick={() => modifyUserW()}
                  >
                    <button onClick={() => modifyUserW()}>warmup</button>
                  </span>
                </div>
              </Link>
              <Link to={`${url}/asana`}>
                <div className={user && user.asana ? "card-done" : "card"}>
                  <h1>
                    Asana-
                    {user && user.asana ? "yes" : "no"}
                  </h1>
                  <button onClick={() => modifyUserA()}>asana</button>
                </div>
              </Link>

              <Link to={`${url}/pranayama`}>
                <div className={user && user.pranayama ? "card-done" : "card"}>
                  <h1>
                    Pranayama-
                    {user && user.pranayama ? "yes" : "no"}
                  </h1>
                  <button onClick={() => modifyUserP()}>pranayama</button>
                </div>
              </Link>
              <Link to={`${url}/dhyana`}>
                <div className={user && user.dhyana ? "card-done" : "card"}>
                  <h1>
                    Dhyana-
                    {user && user.dhyana ? "yes" : "no"}
                  </h1>
                  <button onClick={() => modifyUserD()}>dhyana</button>
                </div>
              </Link>
            </div>
          </Route>

          <Route
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/warmup`} component={Warmup} />
                <Route path={`${url}/asana`} component={Asana} />
                <Route path={`${url}/pranayama`} component={Pranayama} />
                <Route path={`${url}/dhyana`} component={Dhyana} />
              </>
            )}
          />
        </Switch>
      </>
    </div>
  )
}
