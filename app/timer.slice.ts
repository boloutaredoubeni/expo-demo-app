import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./timer.store";

export interface TimerSlice {
  mode: 'working' | 'resting' | 'none';
  running: boolean;
}

const initialState: TimerSlice = {
  mode: 'none',
  running: false
}

export const WORKING_DURATION = 1000  * 60 * 25

export const timerSlice = createSlice({
  name: 'state', initialState, reducers: {
    setMode: (state, action: PayloadAction<typeof initialState.mode>) => {
      state.mode = action.payload;
    },
    startTimer: (state) => {
      state.running = true;
    },
    stopTimer: (state) => {
      state.running = false;
      state.mode = 'none';
    }
  }
})

export const {setMode, startTimer, stopTimer} = timerSlice.actions


export const selectMode = (state: RootState) => state.timer.mode

export default timerSlice.reducer


