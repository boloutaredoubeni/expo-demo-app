import {createListenerMiddleware, isAllOf} from '@reduxjs/toolkit'
import {startTimer, stopTimer, WORKING_DURATION} from './timer.slice'


const middleware = createListenerMiddleware()

middleware.startListening({
    matcher: isAllOf(startTimer),
    effect: async (action, perform) => {
        console.log('startTimer')
        await perform.delay(WORKING_DURATION)
        console.log('stoppingTimer')
        perform.dispatch(stopTimer())
    }
})

export default middleware.middleware