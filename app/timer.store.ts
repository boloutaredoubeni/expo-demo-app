import {configureStore} from "@reduxjs/toolkit"
import timer from "./timer.slice";
import logger from "redux-logger";
import timerMiddleware from "./timer.middleware";

const timerStore = configureStore({
  reducer: {
    timer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      logger
  ).prepend(timerMiddleware)
})

export type RootState = ReturnType<typeof timerStore.getState>
export type AppDispatch = typeof timerStore.dispatch

export default timerStore