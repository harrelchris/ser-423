import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from './Button';

export default class App extends React.Component {
  handleButtonPress() {
    Alert.alert('Alert', 'You clicked this button!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.btn}>My first button</Button>
        <Button success style={styles.btn}>Success button</Button>
        <Button info style={styles.btn}>Info button</Button>
        <Button danger rounded style={styles.btn} onPress={this.handleButtonPress}>Rounded button</Button>
        <Button primary style={styles.btn}>Primary button</Button>
        <Button secondary rounded style={styles.btn}>Secondary button</Button>
        <Button warning style={styles.btn}>Warning button</Button>
        <Button dark rounded style={styles.btn}>Dark button</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 10,
  },
});
