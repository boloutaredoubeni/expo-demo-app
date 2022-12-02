import {act, fireEvent, render} from '@testing-library/react-native'
import Home from './Home'
import {Provider} from 'react-redux'
import timerStore from './timer.store'
import {WORKING_DURATION} from './timer.slice'

describe('Home', () => {
    it('can start working', () => {
        const {getByTestId, getByText} = render(<Provider store={timerStore}><Home /></Provider>)
        const button = getByTestId('start-button')
        fireEvent.press(button)
        getByText('working')
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
})
