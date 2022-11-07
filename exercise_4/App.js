import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const key = '@MyApp:key';

export default class App extends Component {
  state = {
    text: null,
    storedValue: null,
  };

  constructor() {
    super();
    this.onLoad();
  }

  onLoad = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      this.setState({ storedValue });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  }

  onSave = async () => {
    const { text } = this.state;
    try {
      await AsyncStorage.setItem(key, text);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  }

  onChange = (text) => {
    this.setState({ text });
  }

  render() {
    const { storedValue, text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.preview}>{storedValue}</Text>
        <View>
          <Picker
            style={styles.input}
            selectedValue={text}
            onValueChange={(itemValue, itemIndex) =>
              this.onChange(itemValue)
            }>
            <Picker.Item label="1 Star" value="1 Star" />
            <Picker.Item label="2 Stars" value="2 Stars" />
            <Picker.Item label="3 Stars" value="3 Stars" />
            <Picker.Item label="4 Stars" value="4 Stars" />
            <Picker.Item label="5 Stars" value="5 Stars" />
          </Picker>
          <Picker
            style={styles.input}
            selectedValue={text}
            onValueChange={(itemValue, itemIndex) =>
              this.onChange(itemValue)
            }>
            <Picker.Item label="1 Star" value="1 Star" />
            <Picker.Item label="2 Stars" value="2 Stars" />
            <Picker.Item label="3 Stars" value="3 Stars" />
            <Picker.Item label="4 Stars" value="4 Stars" />
            <Picker.Item label="5 Stars" value="5 Stars" />
          </Picker>
          <Picker
            style={styles.input}
            selectedValue={text}
            onValueChange={(itemValue, itemIndex) =>
              this.onChange(itemValue)
            }>
            <Picker.Item label="1 Star" value="1 Star" />
            <Picker.Item label="2 Stars" value="2 Stars" />
            <Picker.Item label="3 Stars" value="3 Stars" />
            <Picker.Item label="4 Stars" value="4 Stars" />
            <Picker.Item label="5 Stars" value="5 Stars" />
          </Picker>
          <TouchableOpacity onPress={this.onSave} style=
            {styles.button}>
            <Text>Save locally</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLoad} style=
            {styles.button}>
            <Text>Load data</Text>
          </TouchableOpacity>
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
  },
  preview: {
    backgroundColor: '#bdc3c7',
    width: 300,
    height: 80,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50,
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 5,
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
  },
});