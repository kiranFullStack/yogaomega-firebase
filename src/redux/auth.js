//
// ─── INITIAL STATE ──────────────────────────────────────────────────────────────
//

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  token: "",
  errorMessage: "",
}

//
// ─── REDUCER  ────────────────────────────────────────────────────────────────────
//

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_SIGN_UP":
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: "",
        token: action.payload,
      }
    case "SETUSER":
      return {
        ...state,
        errorMessage: action.payload,
      }
    case "REDUXTEST":
      return {
        ...state,
        errorMessage: action.payload,
      }
    case "SIGNOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: {},
      }

    default:
      return state
  }
}

export const REDUXTEST = (data) => {
  console.log("Hello from redux action")

  return {
    type: "REDUXTEST",
    payload: data,
  }
}

export const SIGNOUT = () => {
  return {
    type: "SIGNOUT",
    //   payload: true
  }
}

export default auth
