import React, { Component } from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Base, Default, Danger, Info, Success, Primary, Secondary, Warning, Dark } from './styles';


export default class Button extends Component {
  getTheme() {
    const {danger, info, success, primary, secondary, warning, dark} = this.props;

    if (info) {
      return Info
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
    const {children, onPress, style, rounded} = this.props

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          Base.main,
          theme.main,
          rounded ? Base.rounded : null,
          style,
        ]}
        onPress={onPress}
      >
        <Text style={[Base.label, theme.label]}>{children}</Text>
      </TouchableOpacity>
    )
  }
}