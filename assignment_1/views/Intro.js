import { StyleSheet, Text, View } from 'react-native';

export default function IntroView() {
    return (
        <View style={styles.container}>
            <Text>Hello, SER 423! My name is Chris Harrel.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f51',
        alignItems: 'center',
        justifyContent: 'center',
    },
});