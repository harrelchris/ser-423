import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import Notification from "./Notification";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default class App extends Component {
  state = {
    notify: false,
    message: "",
    latitude: 33.307146,
    longitude: -111.68177,
  };

  async componentDidMount() {
    await Location.requestForegroundPermissionsAsync();
  }

  async setCurrentLocation() {
    Location.getLastKnownPositionAsync()
      .then((data) => {
        this.setState({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        });
      })
      .catch((error) => {
        console.error(error)})
  }

  toggleNotification = () => {
    this.setState({
      notify: !this.state.notify,
    });
  };

  render() {
    const notify = this.state.notify ? (
      <Notification
        autoHide
        message={this.state.message}
        onClose={this.toggleNotification}
      />
    ) : null;

    return (
      <SafeAreaView style={styles.container}>
        {notify}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            image={require('./assets/you-are-here.png')}
          ></Marker>
        </MapView>
        <View style={styles.btn}>
          <Button
            style={styles.btn}
            title={"You"}
            onPress={() => {
              this.setCurrentLocation();
              this.setState({message: "Changed to You"});
              this.toggleNotification();
            }}
          ></Button>
        </View>
        <View style={styles.btn}>
          <Button
            style={styles.btn}
            title={"POI 1"}
            onPress={() => {
              this.setState({
                latitude: 33.307146,
                longitude: -111.681177,
              });
              this.setState({message: "Changed to POI 1"});
              this.toggleNotification();
            }}
          ></Button>
        </View>
        <View style={styles.btn}>
          <Button
            style={styles.btn}
            title={"POI 2"}
            onPress={() => {
              this.setState({
                latitude: 33.423204,
                longitude: -111.939612,
              });
              this.setState({message: "Changed to POI 2"});
              this.toggleNotification();
            }}
          ></Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    elevation: -1,
  },
  btn: {
    padding: 5,
  },
});
