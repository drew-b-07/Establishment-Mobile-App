import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, globalStyles } from '../styles/globalStyles';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return [globalStyles.button, globalStyles.secondaryButton, style];
      case 'link':
        return [globalStyles.linkButton, style];
      default:
        return [globalStyles.button, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return [globalStyles.secondaryButtonText, textStyle];
      case 'link':
        return [globalStyles.linkText, textStyle];
      default:
        return [globalStyles.buttonText, textStyle];
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        (disabled || loading) && globalStyles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.primary : colors.white} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
