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

const threeAssignmentImages = [];

const Container = glamorous.view({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
});

const Headline = glamorous.text({
  fontSize: 30,
  paddingBottom: 8,
});

const SubHeading = glamorous.text({
  fontSize: 26,
  paddingBottom: 8,
});

const ButtonText = glamorous.text({
  fontSize: 18,
  color: "white",
});

const Button = glamorous.touchableHighlight({ padding: 10 }, (props) => ({
  backgroundColor: props.warning ? "red" : "blue",
}));

const { ImageGlam } = glamorous;

const AlbumText = glamorous.text({
  fontSize: 18,
  color: "#000",
});

const TitleText = glamorous.text({
  fontSize: 28,
  color: "#333",
});

const URLText = glamorous.text({
  fontSize: 8,
  color: "#5F5",
});

const ThumbnailURLText = glamorous.text({
  fontSize: 8,
  color: "#CFC",
});

const photos = {
  1: {
    albumId: 1,
    title: 1,
    url: "https://picsum.photos/200/300",
    thumbnail: "https://i.picsum.photos/id/23/3887/4899.jpg?hmac=2fo1Y0AgEkeL2juaEBqKPbnEKm_5Mp0M2nuaVERE6eE",
    id: 1
  },
  2: {
    albumId: 2,
    title: 2,
    url: "https://picsum.photos/200/300?grayscale",
    thumbnail: "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
    id: 2
  },
  3: {
    albumId: 3,
    title: 3,
    url: "https://picsum.photos/200/300/?blur=1",
    thumbnail: "https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
    id: 3
  },
}

class Album extends Component {
  state = {
    index: 1,
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
    if (this.state.index === 3) {
      this.state.index = 1;
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
          <Text>Album {photos[this.state.index].albumId}</Text>
        </AlbumText>
        <TitleText style={styles.title}>
          <Text>Title {photos[this.state.index].title}</Text>
        </TitleText>
        <URLText style={styles.url}>
          <Text>URL {photos[this.state.index].url}</Text>
        </URLText>
        <ThumbnailURLText style={styles.thumbnail}>
          <Text>Thumbnail {photos[this.state.index].thumbnail}</Text>
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
