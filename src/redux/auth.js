//
// ─── INITIAL STATE ──────────────────────────────────────────────────────────────
//

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  token: null,
  errorMessage: null,
}

//
// ─── REDUCER  ────────────────────────────────────────────────────────────────────
//

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USERAUTH":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.user ? true : false,
      }

    default:
      return state
  }
}

export const USERAUTH = (user) => {
  console.log("userauth action")
  return {
    type: "USERAUTH",
    payload: user,
  }
}

export default auth
