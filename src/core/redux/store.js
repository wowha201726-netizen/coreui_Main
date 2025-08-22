import { configureStore } from "@reduxjs/toolkit";
// import thunkMiddleware from "redux-thunk"
import rootReducer from "./reducer";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = configureStore({
  reducer: rootReducer,
});

export default store;
