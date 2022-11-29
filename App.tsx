import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'

export default function App() {

    const [clicked, setClicked] = useState(false);

    return (
        <View style={styles.container}>
            <Text>Hello, World!</Text>
            {!clicked && <Pressable testID="click-me-button" onPress={() => setClicked(true)}>
                <Text>Click me</Text>
            </Pressable>}
            {clicked && <Text>Hi!</Text>}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
