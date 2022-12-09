import {act, fireEvent, render} from '@testing-library/react-native'
import Home from '../Home'
import {Provider} from 'react-redux'
import {setupStore} from '../../../app/store'


jest.useFakeTimers()
describe('Home', () => {

    it('loads with the initial state', () => {
        const store = setupStore()
        const {getByTestId, getByText} = render(<Provider store={store}><Home/></Provider>)
        getByTestId('start-button')
        getByText(/none/i)
        getByText(/0:00/i)
    })


    it('can start working', () => {
        const store = setupStore()
        const {getByTestId, getByText} = render(<Provider store={store}><Home/></Provider>)
        const button = getByTestId('start-button')
        fireEvent.press(button)
        getByText('working')
    })

    it('updates the timer every second', () => {
        const store = setupStore({
            timer: {
                mode: 'working',
                time: 1000 * 30,
                running: true,
            }
        })
        const {getByTestId, getByText, debug} = render(<Provider store={store}><Home/></Provider>)
        getByTestId('pause-button')
        getByText(/working/i)
        getByText(/00:30/i)

        act(() => {

            debug()
            jest.advanceTimersByTime(1000)
            getByText(/00:29/i)

            jest.clearAllTimers()
        })

    })


    it('waits for timer to finish', () => {
        const store = setupStore({
            timer: {
                mode: 'working',
                time: 1000,
                running: true,
            }
        })
        const {getByText} = render(<Provider store={store}><Home/></Provider>)
        act(() => {
            getByText(/working/i)
            jest.advanceTimersByTime(1000)
            getByText(/resting/i)
        })
    })

    it('can pause a timer', () => {
        const store = setupStore({
            timer: {
                mode: 'working',
                time: 1000,
                running: true,
            }
        })
        const {getByTestId, getByText} = render(<Provider store={store}><Home/></Provider>)
        const button = getByTestId('pause-button')
        fireEvent.press(button)
        getByText(/paused/i)
    })

    it('can resume a timer', () => {
        const store = setupStore({
            timer: {
                mode: 'working',
                time: 1000,
                running: false,
            }
        })
        const {getByTestId, getByText} = render(<Provider store={store}><Home/></Provider>)
        const button = getByTestId('resume-button')
        fireEvent.press(button)
        getByText(/working/i)
    })

    it('can reset a timer', () => {
        const store = setupStore({
            timer: {
                mode: 'working',
                time: 1000,
                running: false,
            }
        })
        const {getByTestId, getByText} = render(<Provider store={store}><Home/></Provider>)
        const button = getByTestId('reset-button')
        fireEvent.press(button)
        getByText(/00:00/i)
        getByText(/none/i)
    })
})
