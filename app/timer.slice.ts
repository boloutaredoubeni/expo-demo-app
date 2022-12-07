import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./timer.store";

export interface TimerSlice {
  mode: 'working' | 'resting' | 'none';
  running: boolean;
  time: number;
}

const initialState: TimerSlice = {
  mode: 'none',
  running: false,
  time: 0,
}

export const WORKING_DURATION = 1000 * 60 * 0.5;
export const RESTING_DURATION = 1000 * 60  * 0.1;

export const timerSlice = createSlice({
  name: 'state', initialState, reducers: {
    setMode: (state, action: PayloadAction<typeof initialState.mode>) => {
      switch (action.payload) {
        case 'working': {
          state.time = WORKING_DURATION
          break
        }
        case 'resting': {
          state.time = RESTING_DURATION
          break
        }
        default: {
            state.time = 0
        }
      }
      state.mode = action.payload;
    },
    startTimer: (state) => {
      state.running = true;
    },
    stopTimer: (state) => {
      state.running = false;
      state.mode = 'none';
      state.time = 0;
    },
    stepTimer: (state, action: PayloadAction<typeof initialState.time>) => {
      if (state.running) state.time = action.payload;
    },
    pauseTimer: (state) => {
      state.running = false;
    },
    resumeTimer: (state) => {
      state.running = true;
    },
    resetEverything: (state) => {
      state.mode = 'none';
      state.running = false;
      state.time = 0;
    }
  }
})

export const {setMode, startTimer, stopTimer, stepTimer, pauseTimer, resumeTimer, resetEverything} = timerSlice.actions


export const getMode = (state: RootState) => state.timer.mode

export const getTime = (state: RootState) => state.timer.time

export const isRunning = (state: RootState) => state.timer.running

const getDuration = (state: RootState) => {
  switch (getMode(state)) {
    case 'working': {
        return WORKING_DURATION
    }
    case 'resting': {
        return RESTING_DURATION
    }
    default: {
        return 0
    }
  }
}

export const isPaused = (state: RootState) => !isRunning(state) && (getTime(state) < getDuration(state)) && getTime(state) != 0

export const isStopped = (state: RootState) => !isRunning(state) && ((getTime(state) === 0) || (getTime(state) === getDuration(state)))

export default timerSlice.reducer


