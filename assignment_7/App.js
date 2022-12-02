import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  NativeModules,
  TextInput,
  Switch,
  FlatList
} from 'react-native';

const { HelloManager } = NativeModules;

export default class App extends Component {
  state = {
    userName: null,
    greetingMessage: null,
    isAdmin: false
  }

  users = []

  updateGreetingMessage = (result) => {
    this.setState({
      greetingMessage: result
    });
  }

  greetUser = () => {
    this.refs.userName.blur();
    HelloManager.greetUser(
      this.state.userName,
      this.state.isAdmin,
      this.updateGreetingMessage
    );

    this.users.push({
      name: this.state.userName,
      admin: this.state.isAdmin,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Enter User Name
        </Text>
        <TextInput
          ref="userName"
          autoCorrect={false}
          style={styles.inputField}
          placeholder="User Name"
          onChangeText={(text) => this.setState({ userName: text })
          }
        />
        <Text style={styles.label}>
          Admin
        </Text>
        <Switch
          style={styles.radio}
          onValueChange={
            value => this.setState({ isAdmin: value })
          }
          value={this.state.isAdmin}
        />
        <Button
          disabled={!this.state.userName}
          title="Greet"
          style={[
            styles.buttonStyle,
            !this.state.userName ? styles.disabled : null
          ]}
          onPress={this.greetUser}
        >
        </Button>
        <Text style={styles.label}>
          Response:
        </Text>
        <Text style={styles.message}>
          {this.state.greetingMessage}
        </Text>
        <Text style={styles.itemHeader}>  Name{'         '}Is Admin</Text>
        <Text style={styles.itemLine}>_____________________</Text>
        <FlatList
          data={this.users}
          renderItem={({item}) => {
          return <Text style={styles.item}>
            {item.name}
            {'           '}
            {/*{item.admin ? "Yes" : "No"}</Text>*/}
            {item.admin
              ? <Text style={styles.itemYes}>Yes</Text>
              : <Text style={styles.itemNo}>No</Text> }</Text>
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputField:{
    padding: 20,
    fontSize: 30,
    width: 200
  },
  label: {
    fontSize: 18,
    marginTop: 18,
    textAlign: 'center',
  },
  radio: {
    marginBottom: 20
  },
  buttonStyle: {
    padding: 20,
    backgroundColor: '#1DA1F2',
    color: '#fff',
    fontSize: 18
  },
  message: {
    fontSize: 22,
    marginLeft: 50,
    marginRight: 50,
  },
  disabled: {
    backgroundColor: '#3C3C3C'
  },
  itemHeader: {
    fontSize: 22,
    color: "black"
  },
  itemLine: {
    fontSize: 30,
    color: "black"
  },
  item: {
    fontSize: 22,
    color: "blue"
  },
  itemYes: {
    color: "green"
  },
  itemNo: {
    color: "red"
  }
});
