import axios from "axios"

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
export default auth
