import reducer, {
    pauseTimer,
    resetEverything,
    resumeTimer,
    setMode,
    startTimer,
    stepTimer,
    stopTimer,
    TimerSlice
} from '../timer.slice'

describe('timer reducer', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual({
            mode: 'none',
            running: false,
            time: 0
        })
    })

    it('should handle setMode', () => {
        const actual = reducer(undefined, setMode('working'))
        expect(actual.mode).toEqual('working')
    })

    it('should handle startTimer', () => {
        const actual = reducer({ running: false } as unknown as TimerSlice, startTimer())
        expect(actual.running).toEqual(true)
    })

    it('should handle stopTimer', () => {
        const actual = reducer({ running: true, time: 1 } as unknown as TimerSlice, stopTimer())
        expect(actual.running).toEqual(false)
        expect(actual.time).toEqual(0)
    })

    it('should handle stepTimer', () => {
        const actual = reducer({ running: true, time: 10 } as unknown as TimerSlice, stepTimer(9))
        expect(actual.time).toEqual(9)
    })

    it('should not handle stepTimer when not running', () => {
        const actual = reducer({ running: false, time: 10 } as unknown as TimerSlice, stepTimer(9))
        expect(actual.time).toEqual(10)
    })

    it('should handle pauseTimer', () => {
        const actual = reducer({ running: true, time: 1 } as unknown as TimerSlice, pauseTimer())
        expect(actual.running).toEqual(false)
        expect(actual.time).toEqual(1)
    })

    it('should handle resumeTimer', () => {
        const actual = reducer({ running: false, time: 1 } as unknown as TimerSlice, resumeTimer())
        expect(actual.running).toEqual(true)
        expect(actual.time).toEqual(1)
    })

    it('should handle resetEverything', () => {
        const actual = reducer({ running: true, time: 1, mode: 'working' } as unknown as TimerSlice, resetEverything())
        expect(actual.running).toEqual(false)
        expect(actual.time).toEqual(0)
        expect(actual.mode).toEqual('none')
    })
})