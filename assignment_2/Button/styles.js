import { StyleSheet } from 'react-native';

const Base = StyleSheet.create({
  main: {
    alignItems: 'center',
    borderRadius: 0,
    padding: 10,
  },
  label: {
    color: '#fff',
  }
});

const Default = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0 ,0 ,0, 0)',
  },
  label: {
    color: '#333',
  },
});

const Danger = StyleSheet.create({
  main: {
    backgroundColor: '#e74c3c',
  },
});

const Light = StyleSheet.create({
  main: {
    backgroundColor: '#3498db',
  },
});

const Success = StyleSheet.create({
  main: {
    backgroundColor: '#1abc9c',
  },
});

const Primary = StyleSheet.create({
  main: {
    backgroundColor: '#0d6efd',
  },
});
const Secondary = StyleSheet.create({
  main: {
    backgroundColor: '#6c757d',
  },
});
const Warning = StyleSheet.create({
  main: {
    backgroundColor: '#ffc107',
  },
});
const Dark = StyleSheet.create({
  main: {
    backgroundColor: '#212529',
  },
});


export {
  Base,
  Danger,
  Light,
  Success,
  Primary,
  Secondary,
  Warning,
  Dark,
  Default,
};
