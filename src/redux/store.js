import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import logger from "redux-logger"
import thunk from "redux-thunk"
import rootReducer from "./rootReducer"

//
// ─── PASS MIDDLEWARE TO THE STORE ───────────────────────────────────────────────
//

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store
