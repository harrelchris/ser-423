import {StyleSheet, Text, TouchableOpacity} from "react-native";

export default function Button({ onLoad, grade }) {
  return (
    <TouchableOpacity onPress={() => {onLoad(grade)}} style={styles.btn}>
      <Text>{grade}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
  }
});
