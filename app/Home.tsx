import {useAppDispatch, useAppSelector} from './hooks'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {selectMode, setMode, startTimer} from './timer.slice'

export default function Home() {

    const mode = useAppSelector(selectMode)

    const dispatch = useAppDispatch()

    const onPress = () => {
        dispatch(setMode('working'))
        dispatch(startTimer())
    }

    return (<View style={styles.container}>
        <Text>{mode}</Text>
        <Pressable onPress={onPress} testID="start-button">
            <Text>Start</Text>
        </Pressable>
        <StatusBar style="auto"/>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    },
})
