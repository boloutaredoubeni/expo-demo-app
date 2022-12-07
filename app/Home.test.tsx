import {act, fireEvent, render} from '@testing-library/react-native'
import Home from './Home'
import {Provider} from 'react-redux'
import timerStore from './timer.store'
import {WORKING_DURATION} from './timer.slice'

jest.useFakeTimers()
describe('Home', () => {
    it('can start working', () => {
        const {getByTestId, getByText} = render(<Provider store={timerStore}><Home /></Provider>)
        const button = getByTestId('start-button')
        fireEvent.press(button)
        getByText('working')
    })

    it('updates the timer every second', () => {
        const {getByTestId, getByText, debug} = render(<Provider store={timerStore}><Home /></Provider>)
        const button = getByTestId('start-button')
        fireEvent.press(button)
        getByText('working')
        act(() => {
            jest.advanceTimersByTime(1000)
            getByText('working')
            getByText('24:59')
            debug()
            jest.clearAllTimers()
        })

    })


    it('waits for timer to finish', () => {
        const {getByTestId, getByText} = render(<Provider store={timerStore}><Home /></Provider>)
        const button = getByTestId('start-button')
        fireEvent.press(button)
        act(async () => {
            jest.advanceTimersByTime(WORKING_DURATION)
            expect(getByText('working')).toBeFalsy()
        })
    })

    // TODO: pause and resume and clear
    it('can pause a timer', () => {
        const {getByTestId, getByText} = render(<Provider store={timerStore}><Home /></Provider>)
        const button = getByTestId('start-button')
        fireEvent.press(button)
        getByText('working')
        act(() => {
            jest.advanceTimersByTime(1000)
            const pause = getByTestId('pause-button')
            fireEvent.press(pause)
        })

        getByText('paused')
    })
})
