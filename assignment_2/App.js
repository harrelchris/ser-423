import React, {useState} from 'react';
import {ScrollView} from "react-native";
import {WebView} from "react-native-webview";
import Button from "./Button";

export default function App() {
  const links = [
    {'title': 'Asia', 'url': 'https://en.wikipedia.org/wiki/Asia'},
    {'title': 'Africa', 'url': 'https://en.wikipedia.org/wiki/Africa'},
    {'title': 'Europe', 'url': 'https://en.wikipedia.org/wiki/Europe'},
    {'title': 'Australia', 'url': 'https://en.wikipedia.org/wiki/Australia'},
    {'title': 'Antarctica', 'url': 'https://en.wikipedia.org/wiki/Antarctica'},
    {'title': 'North America', 'url': 'https://en.wikipedia.org/wiki/North_America'},
    {'title': 'South America', 'url': 'https://en.wikipedia.org/wiki/South_America'},
  ]

  const [url, setUrl] = useState('https://en.wikipedia.org')

  return (
    <ScrollView>
      <WebView source={{uri: url}} style={{height: 319}}/>
      <Button onPress={() => setUrl(links[0].url)} dark>Asia</Button>
      <Button onPress={() => setUrl(links[1].url)} light>Africa</Button>
      <Button onPress={() => setUrl(links[2].url)} danger>Europe</Button>
      <Button onPress={() => setUrl(links[3].url)} primary>Australia</Button>
      <Button onPress={() => setUrl(links[4].url)} success>Antarctica</Button>
      <Button onPress={() => setUrl(links[5].url)} warning>North America</Button>
      <Button onPress={() => setUrl(links[6].url)} secondary>South America</Button>
    </ScrollView>
  )
}
