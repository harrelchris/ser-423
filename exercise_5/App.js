// import React, { Component } from 'react';
// import {
//   Location,
//   Permissions,
//   MapView,
//   Marker
// } from 'expo';
// import {
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
//
// export default class App extends Component {
//   state = {
//     location: null
//   }
//
//   async componentDidMount() {
//     try {
//       const permission = await Permissions.askAsync(Permissions.LOCATION);
//       if (permission && permission.status === 'granted') {
//         this.getLocation();
//       }
//     } catch (e) {
//       console.log(e)
//     }
//
//   }
//
//   async getLocation() {
//     let location = await Location.getCurrentPositionAsync({});
//     this.setState({
//       location
//     });
//   }
//
//   renderMap() {
//     return this.state.location ?
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: this.state.location.coords.latitude,
//           longitude: this.state.location.coords.longitude,
//           latitudeDelta: 0.09,
//           longitudeDelta: 0.04,
//         }}
//       >
//         {/*<MapView.Marker*/}
//         {/*  coordinate={this.state.location.coords}*/}
//         {/*  title={"User Location"}*/}
//         {/*  description={"You are here!"}*/}
//         {/*  image={require('./assets/you-are-here.png')}*/}
//         {/*/>*/}
//     </MapView> : null
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         {this.renderMap()}
//       </View>
//     );
//   }
//
// }
//
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   map: {
//     flex: 1
//   }
// });



import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class App extends Component {
  state = {
    location: null,
  }

  async componentDidMount() {
    try {
      const permission = await Permissions.askAsync(Permissions.LOCATION);
      const location = await Location.getCurrentPositionAsync()
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return this.state.location ?
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      ></MapView> : null

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})