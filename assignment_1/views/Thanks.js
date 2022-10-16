import { StyleSheet, Text, View } from 'react-native';

export default function Thanks() {
    return (
        <View style={styles.container}>
            <Text>Thanks for using my app!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15f',
        alignItems: 'center',
        justifyContent: 'center',
    },
});