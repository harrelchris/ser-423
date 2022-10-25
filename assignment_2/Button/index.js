import {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Base, Default, Primary, Secondary, Success, Danger, Warning, Light, Dark} from './styles';


export default class Button extends Component {
  getTheme() {
    const {primary, secondary, success, danger, warning, light, dark} = this.props;

    if (light) {
      return Light
    }

    if (success) {
      return Success
    }

    if (danger) {
      return Danger
    }

    if (primary) {
      return Primary
    }

    if (secondary) {
      return Secondary
    }

    if (warning) {
      return Warning
    }

    if (dark) {
      return Dark
    }

    return Default
  }

  render() {
    const theme = this.getTheme();
    const {children, onPress, style} = this.props

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          Base.main,
          theme.main,
          style,
        ]}
        onPress={onPress}
      >
        <Text style={[Base.label, theme.label]}>{children}</Text>
      </TouchableOpacity>
    )
  }
}