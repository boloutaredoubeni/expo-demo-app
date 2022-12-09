import {combineReducers, configureStore, PreloadedState} from "@reduxjs/toolkit"
import timer from "../features/timer/timer.slice";
import logger from "redux-logger";
import timerMiddleware from "../features/timer/timer.middleware";

const reducer = combineReducers({
    timer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        logger
    ).prepend(timerMiddleware)
  })
}

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default setupStore()