
import store from './app/store'
import Home from './features/timer/Home'
import {Provider} from 'react-redux'

export default function App() {

    return (<Provider store={store}>
        <Home/>
    </Provider>)
}
