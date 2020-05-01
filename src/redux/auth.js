//
// ─── INITIAL STATE ──────────────────────────────────────────────────────────────
//

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
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
    case "USERAUTH":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload ? true : false,
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

export const USERAUTH = (user) => {
  console.log("userauth action")
  return {
    type: "USERAUTH",
    payload: user,
  }
}

export default auth
