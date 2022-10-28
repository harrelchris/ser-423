import {StyleSheet, TextInput} from "react-native";

function formatResults(grade, results) {
  try {
    results = JSON.parse(results)
    let names = results.join('\n')
    const article = ['A', 'E'].includes(grade) ? 'an' : 'a'
    return `Students who received ${article} ${grade} grade:\n${names}`
  } catch {
    return 'Loading, please wait...'
  }
}

export default function Display({ state }) {
  return (
    <TextInput
      style={styles.preview}
      value={formatResults(state.grade, state.results)}
      placeholder="Results..."
      editable={false}
      multiline
    />
  )
}

const styles = StyleSheet.create({
  preview: {
    backgroundColor: '#bdc3c7',
    width: 300,
    height: 290,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50,
  }
});
