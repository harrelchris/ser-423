import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "@MyApp:key";

const playlist = [
  {
    title: 'People Watching',
    artist: 'Keller Williams',
    album: 'Keller Williams Live at The Westcott Theater on 2012-09-22',
    uri: 'https://ia800308.us.archive.org/7/items/kwilliams2012-09-22.at853.flac16/kwilliams2012-09-22at853.t16.mp3'
  },
  {
    title: 'Hunted By A Freak',
    artist: 'Mogwai',
    album: 'Mogwai Live at Ancienne Belgique on 2017-10-20',
    uri: 'https://ia601509.us.archive.org/17/items/mogwai2017-10-20.brussels.fm/Mogwai2017-10-20Brussels-07.mp3'
  },
  {
    title: 'Nervous Tic Motion of the Head to the Left',
    artist: 'Andrew Bird',
    album: 'Andrew Bird Live at Rio Theater on 2011-01-28',
    uri: 'https://ia800503.us.archive.org/8/items/andrewbird2011-01-28.early.dr7.flac16/andrewbird2011-01-28.early.t07.mp3'
  }
];


export default class App extends Component {
  state = {
    text: "",
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
    currentTrackIndex: 0,
    isBuffering: false,

    song0Rating: 'No Rating',
    song1Rating: 'No Rating',
    song2Rating: 'No Rating',
  }

  onLoad = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      this.setState({ storedValue });
    } catch (error) {
      Alert.alert("Error", "There was an error while loading the data");
    }
  };

  onSave = async () => {
    const { text } = this.state;

    try {
      await AsyncStorage.setItem(key, text);
      Alert.alert("Saved", "Successfully saved on device");
    } catch (error) {
      Alert.alert("Error", "There was an error while saving the data");
    }
  };

  getRating() {
    const { currentTrackIndex } = this.state;
    if (currentTrackIndex === 0) {
      return this.state.song0Rating
    } else if (currentTrackIndex === 1) {
      return this.state.song1Rating
    } else {
      return this.state.song2Rating
    }
  }

  onRate(rating) {
    console.log(rating)
    const { currentTrackIndex } = this.state;
    if (currentTrackIndex === 0) {
      this.setState({
        song0Rating: rating
      })
    } else if (currentTrackIndex === 1) {
      this.setState({
        song1Rating: rating
      })
    } else {
      this.setState({
        song2Rating: rating
      })
    }
  }

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX = 1,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX = 1,
    });
    this.loadAudio();
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = {
      uri: playlist[this.state.currentTrackIndex].uri
    }
    const status = {
      shouldPlay: this.state.isPlaying,
      volume: this.state.volume,
    };
    playbackInstance
      .setOnPlaybackStatusUpdate(
        this.onPlaybackStatusUpdate
      );
    await playbackInstance.loadAsync(source, status, false);
    this.setState({
      playbackInstance
    });
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering
    });
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying ? await playbackInstance.pauseAsync() : await
      playbackInstance.playAsync();
    this.setState({
      isPlaying: !isPlaying
    });
  }

  handlePreviousTrack = async () => {
    let { playbackInstance, currentTrackIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentTrackIndex === 0 ? currentTrackIndex = playlist.length
        - 1 : currentTrackIndex -= 1;
      this.setState({
        currentTrackIndex
      });
      this.loadAudio();
    }
  }

  handleNextTrack = async () => {
    let { playbackInstance, currentTrackIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentTrackIndex < playlist.length - 1 ? currentTrackIndex
        +=
        1 : currentTrackIndex = 0;
      this.setState({
        currentTrackIndex
      });
      this.loadAudio();
    }
  }

  renderSongInfo() {
    const { playbackInstance, currentTrackIndex } = this.state;
    return playbackInstance ?
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {playlist[currentTrackIndex].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {playlist[currentTrackIndex].artist}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {playlist[currentTrackIndex].album}
        </Text>
      </View>
      : null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.largeText, styles.buffer]}>
          {this.state.isBuffering && this.state.isPlaying ?
            'Buffering...' : null}
        </Text>
        {this.renderSongInfo()}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePreviousTrack}
          >
            <Feather name="skip-back" size={32} color="#fff"/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause}
          >
            {this.state.isPlaying ?
              <Feather name="pause" size={32} color="#fff"/> :
              <Feather name="play" size={32} color="#fff"/>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handleNextTrack}
          >
            <Feather name="skip-forward" size={32} color="#fff"/>
          </TouchableOpacity>
        </View>
        <Picker
          style={styles.input}
          selectedValue={this.getRating()}
          onValueChange={(rating, itemIndex) => {
            this.onRate(rating)
          }}>
          <Picker.Item label="No Rating" value="No Rating" />
          <Picker.Item label="1 Star" value="1 Star" />
          <Picker.Item label="2 Stars" value="2 Stars" />
          <Picker.Item label="3 Stars" value="3 Stars" />
          <Picker.Item label="4 Stars" value="4 Stars" />
          <Picker.Item label="5 Stars" value="5 Stars" />
        </Picker>
        <TouchableOpacity onPress={this.onSave} style={styles.button}>
          <Text>Save locally</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onLoad} style={styles.button}>
          <Text>Load data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#191A1A',
  },
  buffer: {
    color: '#fff'
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#fff'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
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