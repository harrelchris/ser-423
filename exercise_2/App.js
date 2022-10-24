import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import Button from './Button';

export default class App extends React.Component {
  handleButtonPress() {
    Alert.alert('Alert', 'You clicked this button!');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Button contentContainerStyle={styles.btn}>My first button</Button>
        <Button success contentContainerStyle={styles.btn}>Success button</Button>
        <Button info contentContainerStyle={styles.btn}>Info button</Button>
        <Button danger rounded contentContainerStyle={styles.btn} onPress={this.handleButtonPress}>Rounded button</Button>
        <Button primary contentContainerStyle={styles.btn}>Primary button</Button>
        <Button secondary rounded contentContainerStyle={styles.btn}>Secondary button</Button>
        <Button warning contentContainerStyle={styles.btn}>Warning button</Button>
        <Button dark rounded contentContainerStyle={styles.btn}>Dark button</Button>
      </ScrollView>
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
