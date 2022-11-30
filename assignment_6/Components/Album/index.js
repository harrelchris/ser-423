import React, { Component } from "react";
import glamorous from "glamorous-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import randomColor from 'randomcolor';
import { connect } from "react-redux";
import {
  fetchPhotos,
  addPhoto,
  removePhoto
} from '../../redux/photos/actions';
import store from "../../redux";

const AlbumText = glamorous.text({
  fontSize: 24,
  color: "#000",
});

const TitleText = glamorous.text({
  fontSize: 30,
  color: "#333",
});

const URLText = glamorous.text({
  fontSize: 12,
  color: "#5F5",
});

const ThumbnailURLText = glamorous.text({
  fontSize: 12,
  color: "#CFC",
});

const photos = [
  {
    albumId: "art001e000607",
    title: "Flight Day 9: Orion in Blue",
    url: "https://images-assets.nasa.gov/image/art001e000607/art001e000607~medium.jpg",
    thumbnail: "https://images-assets.nasa.gov/image/art001e000607/art001e000607~thumb.jpg",
    id: 0
  },
  {
    albumId: "iss068e025141",
    title: "SpaceX Dragon cargo craft",
    url: "https://images-assets.nasa.gov/image/iss068e025141/iss068e025141~medium.jpg",
    thumbnail: "https://images-assets.nasa.gov/image/iss068e025141/iss068e025141~thumb.jpg",
    id: 1
  },
  {
    albumId: "art001e000672",
    title: "Artemis I Flight Day 13",
    url: "https://images-assets.nasa.gov/image/art001e000672/art001e000672~medium.jpg",
    thumbnail: "https://images-assets.nasa.gov/image/art001e000672/art001e000672~thumb.jpg",
    id: 2
  },

]

class Album extends Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchPhotos();
    }, 2000);
  }

  addPhoto = () => {
    const photo = {
      albumId: this.state.index,
      title: photos[this.state.index].title,
      url: photos[this.state.index].url,
      thumbnailUrl: photos[this.state.index].thumbnail,
    };
    if (this.state.index === photos.length - 1) {
      this.state.index = 0;
    } else {
      this.state.index++;
    }
    this.props.addPhoto(photo);
  };

  removePhoto = (photo) => {
    this.props.removePhoto(photo);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AlbumText style={styles.toolbar}>
          <Text>{photos[this.state.index].albumId}</Text>
        </AlbumText>
        <TitleText style={styles.title}>
          <Text>{photos[this.state.index].title}</Text>
        </TitleText>
        <URLText style={styles.url}>
          <Text>{photos[this.state.index].url}</Text>
        </URLText>
        <ThumbnailURLText style={styles.thumbnail}>
          <Text>{photos[this.state.index].thumbnail}</Text>
        </ThumbnailURLText>

        <ScrollView>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.button} onPress={this.addPhoto}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            {this.props.photos
              ? this.props.photos.map((photo) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.removePhoto(photo)}
                    key={Math.random()}
                  >
                    <Image
                      style={{ width: 300, height: 300, resizeMode: "cover" }}
                      source={{ uri: photos[this.state.index].url }}
                    />
                  </TouchableOpacity>
                );
              })
              : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    width: 300
  },
  button: {
    margin: 10,
    padding: 20,
    backgroundColor: '#000000',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  title: {
    backgroundColor: "#fff",
    borderWidth: 1,
    width: 200,
    margin: 10,
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: "#000",
    padding: 10,
  },
  url: {
    backgroundColor: "#333",
    borderWidth: 1,
    width: 200,
    margin: 10,
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: "#000",
    padding: 10,
  },
  thumbnail: {
    backgroundColor: "#333",
    borderWidth: 1,
    width: 200,
    margin: 10,
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: "#000",
    padding: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    photos: state.photos.photos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPhotos: () => dispatch(fetchPhotos()),
    addPhoto: (photo) => dispatch(addPhoto(photo)),
    removePhoto: (id) => dispatch(removePhoto(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);
