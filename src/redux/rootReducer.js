import { combineReducers } from "redux"
import auth from "./auth"

//
// ─── COMBINE REDUCERS ───────────────────────────────────────────────────────────
//

const rootReducer = combineReducers({
  auth: auth,
})

export default rootReducer
