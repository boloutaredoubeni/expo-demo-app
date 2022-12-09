import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {
    pauseTimer, resetEverything,
    resumeTimer,
    getMode,
    isPaused,
    isRunning,
    getTime,
    setMode,
    startTimer,
    isStopped
} from './timer.slice'

export default function Home() {

    const mode = useAppSelector(getMode)

    const time = useAppSelector(getTime)

    const running = useAppSelector(isRunning)

    const paused = useAppSelector(isPaused)
    const stopped = useAppSelector(isStopped)

    const dispatch = useAppDispatch()

    const onStart = () => {
        dispatch(setMode('working'))
        dispatch(startTimer())
    }

    const onPause = () => {
        dispatch(pauseTimer())
    }

    const onResume = () => {
        dispatch(resumeTimer())
    }

    const onReset = () => {
        dispatch(resetEverything())
    }

    return (<View style={styles.container}>
        <Text>Time: {convertMsToTime(time)}</Text>
        <Text>{mode}</Text>
        {stopped && <Pressable onPress={onStart} testID="start-button">
            <Text>Start</Text>
        </Pressable>}
        {paused && <Pressable onPress={onResume} testID="resume-button">
            <Text>Resume</Text>
        </Pressable>}
        {running && <Pressable onPress={onPause} testID="pause-button">
            <Text>Pause</Text>
        </Pressable>}
        <Pressable onPress={onReset} testID="reset-button"><Text>RESET</Text></Pressable>
        <StatusBar style="auto"/>
    </View>)
}

const convertMsToTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / (1000 * 60)) % 60)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    },
})
