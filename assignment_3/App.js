import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './components/Button'
import Display from './components/Display';


export default class App extends Component {
  state = {
    results: '',
    grade: '',
  };

  onLoad = async (grade) => {
    this.setState({ results: 'Loading, please wait...' });
    const response = await fetch(`https://2s4b8wlhik.execute-api.us-east-1.amazonaws.com/studentData?grade=${grade}`, {
      method: 'GET',
    });
    const results = await response.text();
    this.setState({ results, grade });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Display state={this.state} />
          <Button onLoad={this.onLoad} grade={'A'} />
          <Button onLoad={this.onLoad} grade={'B'} />
          <Button onLoad={this.onLoad} grade={'C'} />
          <Button onLoad={this.onLoad} grade={'D'} />
          <Button onLoad={this.onLoad} grade={'E'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
