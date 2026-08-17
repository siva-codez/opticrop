import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    let style: ViewStyle = { ...styles.container };
    if (variant === 'primary') {
      style = { ...style, backgroundColor: Colors.primary };
    } else if (variant === 'secondary') {
      style = { ...style, backgroundColor: Colors.accent };
    } else if (variant === 'outline') {
      style = { ...style, backgroundColor: 'transparent', borderWidth: 2, borderColor: Colors.primary };
    }

    if (size === 'sm') {
      style = { ...style, paddingVertical: 8, paddingHorizontal: 16 };
    } else if (size === 'md') {
      style = { ...style, paddingVertical: 12, paddingHorizontal: 24 };
    } else if (size === 'lg') {
      style = { ...style, paddingVertical: 16, paddingHorizontal: 32 };
    }

    if (disabled || loading) {
      style = { ...style, opacity: 0.6 };
    }

    return style;
  };

  const getTextStyle = () => {
    let style: TextStyle = { ...styles.text };
    if (variant === 'outline') {
      style = { ...style, color: Colors.primary };
    }
    
    if (size === 'sm') {
      style = { ...style, fontSize: 14 };
    } else if (size === 'lg') {
      style = { ...style, fontSize: 18 };
    }
    return style;
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary : Colors.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 44, // Large touch targets
  },
  text: {
    color: Colors.white,
    fontSize: 16, // Readable font
    fontWeight: '600',
  },
});
