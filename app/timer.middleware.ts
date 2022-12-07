import {createListenerMiddleware, isAllOf, isAnyOf} from '@reduxjs/toolkit'
import {
  pauseTimer,
  resetEverything,
  resumeTimer,
  getTime, setMode,
  startTimer,
  stepTimer,
  stopTimer,
  TimerSlice
} from './timer.slice'
import {RootState} from "./timer.store";


const middleware = createListenerMiddleware()

middleware.startListening({
  predicate: (action, currentState: RootState, previousState: RootState) => {
    const shouldStart = isAnyOf(startTimer, resumeTimer)(action)
    const current = currentState as unknown as RootState
    const previous = previousState as unknown as RootState
    return shouldStart && current.timer.running != previous.timer.running && current.timer.running && current.timer.time > 0
  },
  effect: async (action, perform) => {
    console.log(action.type)
    const time = getTime(perform.getState() as unknown as RootState)
    perform.dispatch(stepTimer(time - 1000))
  }
})

middleware.startListening({
  matcher: isAnyOf(pauseTimer, resetEverything, stopTimer),
  effect: async (action, perform) => {
    perform.cancelActiveListeners()
    if (action.type === stopTimer().type) {
      perform.dispatch(setMode('resting'))
    }
  }
})

middleware.startListening({
  predicate: (action, currentState: RootState, previousState: RootState) => {
    const shouldStart = isAnyOf(stepTimer)(action)
    const current = currentState as unknown as RootState
    const previous = previousState as unknown as RootState
    return shouldStart && current.timer.running && current.timer.time <= previous.timer.time
  },
  effect: async (action, perform) => {
    console.log(action.type)
    const time = getTime(perform.getState() as unknown as RootState)
    if (time <= 0) {
      perform.dispatch(stopTimer())
    } else {
      await perform.delay(1000)
      perform.dispatch(stepTimer(time - 1000))
    }
  }
})

export default middleware.middleware