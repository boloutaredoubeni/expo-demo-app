
import timerStore from './app/timer.store'
import Home from './app/Home'
import {Provider} from 'react-redux'

export default function App() {


    return (<Provider store={timerStore}>
        <Home/>
    </Provider>)
}
